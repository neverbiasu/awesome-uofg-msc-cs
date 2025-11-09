import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mammoth from 'mammoth';
import AdmZip from 'adm-zip';
import xml2js from 'xml2js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 文档处理器基类
class DocumentProcessor {
    constructor() {
        this.supportedExtensions = [];
    }

    async process(filePath, outputPath) {
        throw new Error('子类必须实现 process 方法');
    }

    supports(filePath) {
        const ext = path.extname(filePath).toLowerCase();
        return this.supportedExtensions.includes(ext);
    }
}

// PDF 处理器
class PDFProcessor extends DocumentProcessor {
    constructor() {
        super();
        this.supportedExtensions = ['.pdf'];
    }

    async process(filePath, outputPath) {
        try {
            // 使用pdfjs-dist进行PDF解析
            const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
            
            // 读取PDF文件
            const data = new Uint8Array(fs.readFileSync(filePath));
            const pdf = await pdfjs.getDocument({ data }).promise;
            
            let fullText = '';
            // 提取所有页面的文本
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n';
            }
            
            const content = `# ${path.basename(filePath, '.pdf')}\n\n${fullText}`;
            fs.writeFileSync(outputPath, content);
            return true;
        } catch (error) {
            throw new Error(`PDF 解析失败: ${error.message}`);
        }
    }
}

// Word 文档处理器
class WordProcessor extends DocumentProcessor {
    constructor() {
        super();
        this.supportedExtensions = ['.docx', '.doc'];
    }

    async process(filePath, outputPath) {
        try {
            const { value } = await mammoth.convertToMarkdown({ path: filePath });
            const content = `# ${path.basename(filePath, path.extname(filePath))}\n\n${value}`;
            fs.writeFileSync(outputPath, content);
            return true;
        } catch (error) {
            throw new Error(`Word 文档解析失败: ${error.message}`);
        }
    }
}

// PowerPoint 处理器
class PowerPointProcessor extends DocumentProcessor {
    constructor() {
        super();
        this.supportedExtensions = ['.pptx', '.ppt'];
    }

    async process(filePath, outputPath) {
        try {
            const zip = new AdmZip(filePath);
            const slideFiles = zip.getEntries().filter(entry => 
                entry.entryName.startsWith('ppt/slides/slide') && entry.entryName.endsWith('.xml')
            );

            let allText = '';
            for (const slideFile of slideFiles) {
                const slideContent = slideFile.getData().toString('utf8');
                const result = await xml2js.parseStringPromise(slideContent);
                
                const textElements = this.extractTextFromSlide(result);
                if (textElements.length > 0) {
                    allText += textElements.join('\n') + '\n\n';
                }
            }

            const content = `# ${path.basename(filePath, path.extname(filePath))}\n\n${allText}`;
            fs.writeFileSync(outputPath, content);
            return true;
        } catch (error) {
            throw new Error(`PowerPoint 解析失败: ${error.message}`);
        }
    }

    extractTextFromSlide(slideData) {
        const texts = [];
        const traverse = (obj) => {
            if (typeof obj === 'object' && obj !== null) {
                if (obj['a:t'] && Array.isArray(obj['a:t'])) {
                    texts.push(...obj['a:t'].filter(t => typeof t === 'string'));
                }
                Object.values(obj).forEach(traverse);
            }
        };
        traverse(slideData);
        return texts;
    }
}

// 主提取器类
class MaterialExtractor {
    constructor() {
        this.processors = [
            new PDFProcessor(),
            new WordProcessor(),
            new PowerPointProcessor()
        ];
    }

    getProcessor(filePath) {
        return this.processors.find(processor => processor.supports(filePath));
    }

    async extractFile(inputPath, outputPath) {
        const processor = this.getProcessor(inputPath);
        if (!processor) {
            throw new Error(`不支持的文件类型: ${path.extname(inputPath)}`);
        }

        // 确保输出目录存在
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        return await processor.process(inputPath, outputPath);
    }

    async extractMaterials() {
        const materialsDir = path.join(__dirname, '..', 'materials');
        const includePdf = process.env.INCLUDE_PDFS === '1' || process.env.EXTRACT_PDFS === '1' || process.argv.includes('--include-pdfs') || process.argv.includes('--pdfs');
        const supportedExtensions = includePdf ? ['.pdf', '.docx', '.doc', '.pptx', '.ppt'] : ['.docx', '.doc', '.pptx', '.ppt'];
        
        console.log('🚀 开始提取 materials 中的文档内容...');
        if (!includePdf) {
            console.log('ℹ️ 默认配置：跳过 PDF 文件。如果想包含 PDF，请设置 INCLUDE_PDFS=1 或 加上 --include-pdfs 参数。');
        } else {
            console.log('ℹ️ 配置：包含 PDF 文件进行提取（这可能会增加处理时间）。');
        }
        
        const files = this.findSupportedFiles(materialsDir, supportedExtensions);
        console.log(`📁 找到 ${files.length} 个支持的文档文件`);
        
        let successCount = 0;
        let failCount = 0;
        let processedCount = 0;
        
        for (const file of files) {
            const relativePath = path.relative(materialsDir, file);
            const outputPath = file.replace(path.extname(file), '.md');
            
            processedCount++;
            
            // 只显示进度，不显示每个文件的详细信息
                if (processedCount % 10 === 0 || processedCount === files.length) {
                    try {
                        process.stdout.write(`\r📄 进度: ${processedCount}/${files.length} (${Math.round(processedCount/files.length*100)}%)`);
                    } catch (err) {
                        // 忽略 EPIPE 错误（仅在管道断开时出现）
                        if (err && err.code !== 'EPIPE') {
                            console.warn(err);
                        }
                    }
                }
            
            try {
                await this.extractFile(file, outputPath);
                successCount++;
            } catch (error) {
                failCount++;
                // 只记录失败的文件，不立即输出
                if (failCount === 1) {
                    try {
                        console.log(`\n❌ 提取失败: ${relativePath} ${error.message}`);
                    } catch (err) {
                        // 忽略 EPIPE 错误（仅在管道断开时出现）
                        if (err && err.code !== 'EPIPE') {
                            console.warn(err);
                        }
                    }
                }
            }
        }
        
        try {
            console.log('\n✅ 提取完成！');
            console.log(`📊 统计: 成功 ${successCount} 个，失败 ${failCount} 个`);
        } catch (err) {
            // 忽略 EPIPE 错误（仅在管道断开时出现）
            if (err && err.code !== 'EPIPE') {
                console.warn(err);
            }
        }
    }

    findSupportedFiles(dir, extensions) {
        const files = [];
        
        const scan = (currentDir) => {
            const items = fs.readdirSync(currentDir);
            
            for (const item of items) {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    scan(fullPath);
                } else if (stat.isFile()) {
                    const ext = path.extname(item).toLowerCase();
                    if (extensions.includes(ext)) {
                        files.push(fullPath);
                    }
                }
            }
        };
        
        scan(dir);
        return files;
    }
}

// 主执行逻辑
async function main() {
    try {
        const extractor = new MaterialExtractor();
        await extractor.extractMaterials();
    } catch (error) {
        console.error('❌ 执行失败:', error.message);
        process.exit(1);
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { MaterialExtractor, PDFProcessor, WordProcessor, PowerPointProcessor };
