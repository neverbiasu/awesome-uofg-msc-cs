---
name: fumadocs-version-guard
description: Isolates Fumadocs private API usage and MCP fallbacks so upgrades stay safe. Use when touching Fumadocs loaders, graph logic, or MCP-backed skill references.
metadata:
  author: faych-chen
  version: "1.0.0"
allowed-tools: "read_file grep_search run_shell_command"
---

# Fumadocs Version Guard

隔离对 Fumadocs 内部私有 API 的依赖，确保框架升级不崩溃。核心逻辑：**定义唯一真相源 → 强制一致性校验 → 自动化验证**。

## 唯一真相源 (Single Source of Truth)

先读 [reference](references/FUMADOCS.md)。

- Fumadocs 的公共 Loader 接口是获取页面元数据的唯一权威入口。
- 私有属性（`_` 前缀）不是契约，随时可能变更。

## 核心指令 (Core Mandates)

### 1. API 隔离
- **严禁**在业务逻辑中直接访问以 `_` 开头的私有属性。
- `src/lib/build-graph.ts` 的私有字段依赖属于历史债务，只能在受控适配层里处理。

### 2. 适配层模式
- 文件路径/元数据访问必须经由 `src/lib/source.ts` 导出的公共 Loader 结果，或 Fumadocs 公开 API。
- 新增图构建、索引生成等逻辑时，禁止绕过适配层直接读私有字段。

### 3. 降级路径
- 使用第三方 MCP 获取文档时，**必须**实现 `try-catch` 降级逻辑。
- MCP 缺失或超时，必须回退到本地 reference 或仓库缓存，禁止静默空结果。

## 验证步骤 (Verification)

升级前/改动后运行私有 API 扫描，必须清零：

```bash
# 扫描当前会改到的 Fumadocs 文件里的私有属性访问
echo "=== private API access scan ==="
grep -nE '\._[a-zA-Z]' src/lib/source.ts src/lib/build-graph.ts \
  && echo "PRIVATE API USAGE FOUND" || echo "NO PRIVATE API USAGE"
```

若发现 `._` 访问：
1. 定位调用点，确认是否有公共 API 等价物。
2. 有等价物 → 重构为公共调用。
3. 无等价物 → 在 `src/lib/source.ts` 封装一层适配函数，集中隔离该私有访问。

额外检查 MCP 降级（仅当技能声明依赖 MCP 时）：

```bash
grep -rn "context7\|Context7\|upstash" skills/fumadocs-version-guard references/ \
  && echo "CHECK try-catch fallback in dependent skills" || echo "NO MCP DEP"
```

---
Created: 2026-07-08
