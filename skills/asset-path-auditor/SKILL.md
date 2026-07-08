---
name: asset-path-auditor
description: Prevents dead-image links in MDX by enforcing absolute /images paths, week-aligned storage, and existence checks. Use after editing a note subtree that includes images.
metadata:
  author: faych-chen
  version: "1.0.0"
allowed-tools: "read_file grep_search list_dir run_shell_command"
---

# Static Asset Auditor

防止 MDX 出现死链图片，确保资源路径与内容周次匹配。核心逻辑：**定义唯一真相源 → 强制一致性校验 → 自动化验证**。

## 唯一真相源 (Single Source of Truth)

先读 [reference](references/ASSETS.md)。

- `public/images/` 是唯一图片物理真相源。
- MDX 引用的每个 `/images/...` 都必须存在。

## 核心指令 (Core Mandates)

### 1. 路径绝对化
- 所有图片路径**必须以 `/images/` 开头**。
- 禁止相对路径或越层绝对路径。

### 2. 周次对齐
- `week<N>` 笔记中的图片，必须存储在 `/images/{course}/week<N>/`。
- 禁止把 A 周图片放进 B 周目录，或堆在课程根目录。
- 图片内容必须与当前周文本对应。

### 3. 强制审计
- 每完成一次笔记生成或修改，**必须**执行路径存在性检查（见验证步骤）。
- 审计失败禁止声明"Done"。

## 验证工具 (Verification Pipeline)

只检查当前改动过的笔记文件，避免全库扫描。

```bash
grep -n "/images/" notes/en/path/to/file.mdx notes/zh/path/to/file.mdx \
  | awk -F'(' '{print $2}' | awk -F')' '{print $1}' \
  | while read img; do ls "public$img" || exit 1; done \
  && echo "ASSETS OK" || echo "MISSING ASSET"
```

### 修复流程
若上述命令返回非 0 状态：
1. 从报错信息定位缺失的 `public$img` 路径。
2. 在 `materials/` 对应课程的提取日志/图片目录中查找原图。
3. 将原图复制到正确的 `public/images/{course}/week<N>/` 目录（遵循周次对齐规则）。
4. 重新运行管道直至输出 `ASSETS OK`。

---
Created: 2026-07-08
