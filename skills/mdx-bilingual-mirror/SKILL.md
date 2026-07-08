---
name: mdx-bilingual-mirror
description: Keeps EN/ZH notes structurally symmetric with mirrored filenames, folder depth, and headings. Use when editing a note subtree in notes/en or notes/zh.
metadata:
  author: faych-chen
  version: "1.0.0"
allowed-tools: "read_file grep_search list_dir run_shell_command"
---

# MDX Bilingual Mirror Expert

确保中英文笔记在结构和视觉体验上完全对称。核心逻辑：**定义唯一真相源 → 强制一致性校验 → 自动化验证**。

## 唯一真相源 (Single Source of Truth)

先读 [reference](references/MIRROR.md)。

- `notes/en/` 是结构模板，`notes/zh/` 必须镜像。
- 只比较当前编辑到的课程或周次子树，不要全库扫一遍。

## 核心指令 (Core Mandates)

### 1. 镜像对称
`notes/en/...` 与 `notes/zh/...` 必须在以下维度完全一致：
- 文件名逐文件 1:1。
- 文件夹层级逐层 1:1。
- 文件数量逐目录相等。

### 2. 命名规范
- 中文版文件**必须使用与英文版相同的英文文件名**（例如 `spark-arch.mdx`），仅存放于 `/zh/` 目录下。
- 禁止中文文件名或 `.zh.mdx` 后缀。

### 3. 标题纯净度
- 中文笔记的 H1–H6 标题中**严禁出现英文单词**（除非是专有名词或代码标识符）。
- 必须翻译为标准学术中文。
- frontmatter `title` 应简洁，日期范围放入 `description` 且不重复周次。

### 4. 链接模式
- 所有跨页面链接必须使用 `/${lang}/notes/...` 动态路径模式。
- 禁止硬编码语言前缀或相对路径越层引用。

## 验证步骤 (Verification)

每次改动后运行结构对称校验（忽略文件内容，仅比目录树）：

```bash
# 提取两分支的"相对路径结构"（去内容），比较是否 100% 对称
diff <(cd notes/en && find . -type f | sed 's#^\./##' | sort) \
     <(cd notes/zh && find . -type f | sed 's#^\./##' | sort) \
  && echo "MIRROR OK" || echo "STRUCTURE MISMATCH"
```

若输出 `STRUCTURE MISMATCH`，定位缺失/多余文件并补齐镜像，禁止提交。

额外标题纯净度抽查（中文分支中 H1–H6 含英文单词的行）：

```bash
grep -rnE '^#{1,6} .*[A-Za-z]' notes/zh | grep -vE 'API|GPU|SQL|HTTP|URL|JSON|CSS|HTML|ID' || echo "HEADINGS CLEAN"
```

（白名单词为公认专有名词/代码，其余英文词必须翻译。）

---
Created: 2026-07-08
