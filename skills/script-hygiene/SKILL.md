---
name: script-hygiene
description: Maintains scripts quality with ESM standardization, fail-fast behavior, and cache isolation. Use when changing scripts or generated artifacts that should stay ignored.
metadata:
  author: faych-chen
  version: "1.0.0"
allowed-tools: "read_file grep_search list_dir run_shell_command"
---

# Script Hygiene Maintainer

提升 `scripts/` 目录的代码质量，防止环境污染和假成功。核心逻辑：**定义唯一真相源 → 强制一致性校验 → 自动化验证**。

## 唯一真相源 (Single Source of Truth)

先读 [reference](references/SCRIPTS.md)。

- `package.json` 的 `"type": "module"` 是脚本格式基线。
- 现有脚本只在当前任务涉及的那一个或两个文件里比较，不要扫完整个 `scripts/`。

## 核心指令 (Core Mandates)

### 1. 统一标准
- 所有**新脚本**优先使用 `.mjs`（ESM）。
- 功能重复的脚本只保留一个实现，迁移期内也要写清楚去重计划。
- 禁止无理由混用多种模块系统。

### 2. Fail-Fast 原则
- **严禁**使用伪造成功逻辑。
- 缺失 API Key / 配置时，必须显式报错并 `process.exit(1)`。
- 禁止输出占位符来掩盖失败。

### 3. 缓存隔离
- 由脚本生成的临时缓存（如 `scraped_cache.json`）**必须立即加入 `.gitignore`**。
- 禁止提交会话痕迹或爬取状态文件。

## 验证步骤 (Verification)

提交前运行以下检查，必须全部通过：

```bash
# 1. 检查是否仍存在 .cjs 文件（只看当前迁移相关脚本）
find scripts -maxdepth 1 -name 'convert-pptx-to-pdf.*' | sort

# 2. 检查 .gitignore 是否覆盖脚本生成的 json 缓存
grep -qE 'scraped_cache\.json' .gitignore && echo "CACHE IGNORED" || echo "CACHE NOT IGNORED"

# 3. 抽查 fail-fast：确认无伪造翻译占位符
grep -n "(Translated)" scripts/translate-notes.js && echo "FAKE SUCCESS FOUND" || echo "NO FAKE SUCCESS"
```

若任一检查未通过，先修复再提交。`.cjs` 允许在迁移过渡期存在，但需在 PR 描述中标注清理计划。

---
Created: 2026-07-08
