---
name: course-config-sync
description: Keeps Moodle scraper config, material folders, and course docs in lockstep. Use when adding, renaming, or moving a course, or when a single course entry drifts from the scraper config.
metadata:
  author: faych-chen
  version: "1.0.0"
allowed-tools: "read_file grep_search list_dir run_shell_command"
---

# Course Config Sync Expert

消除 Scraper 配置、物理目录与文档之间命名不一致导致的路径崩溃。核心逻辑：**定义唯一真相源 → 强制一致性校验 → 自动化验证**。

## 唯一真相源 (Single Source of Truth)

先读 [reference](references/COURSES.md)。

- `scripts/complete-scraper.js` 中的 `COURSES` 是课程命名与路径的唯一真相源。
- `COURSES[key].localPath` 决定 `materials/` 的真实目录名。
- `copilot-instructions.md` 的课程表是 `COURSES` 的派生镜像，只能跟随更新。

## 核心指令 (Core Mandates)

### 1. 原子化同步链条
任何课程改动，只处理一个明确的课程条目，不要扫描整个 `materials/` 树。

1. 更新 `scripts/complete-scraper.js` 的目标 `COURSES` 条目。
2. 更新该课程对应的单个物理目录名。
3. 更新 `copilot-instructions.md` 中对应课程的目录名。

### 2. 禁忌 (Hard Rules)
- **严禁**只改 `materials/` 而不回写 `COURSES`。
- **严禁**在 `copilot-instructions.md` 中手写新目录名而不改 `COURSES`。
- 重命名课程时，只允许保留一个真实目录名，禁止同时存在旧别名和新名字。

## 验证步骤 (Verification)

每次改动后运行以下校验，必须返回 0 且 1:1 匹配：

```bash
# 提取 COURSES 中声明的 localPath 目录名
node -e "const m=require('fs').readFileSync('scripts/complete-scraper.js','utf8'); const re=/localPath:\s*'([^']+)'/g; let x; while(x=re.exec(m)){console.log(x[1].split('/').pop())}" | sort > /tmp/courses_declared.txt

# 提取 materials/ 下实际目录（只比较课程目录，不扫全树）
find materials -maxdepth 2 -type d \( -name 'COMPSCI*' -o -name '*professional*' \) | xargs -n1 basename | sort > /tmp/courses_actual.txt

# 1:1 匹配校验（两文件必须完全相同）
diff /tmp/courses_declared.txt /tmp/courses_actual.txt && echo "SYNC OK" || echo "MISMATCH DETECTED"
```

若输出 `MISMATCH DETECTED`，立即定位差异目录并补齐同步链条，禁止提交。

---
Created: 2026-07-08
