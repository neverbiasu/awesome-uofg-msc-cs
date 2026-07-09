# 项目改进看板 (TODO)

来源：代码评审（2026-07-08 / 二次复核 2026-07-09）
优先级：**P0** = 必须修（正确性/密钥风险）｜**P1** = 建议修（根因/潜在崩溃）

## 必要待办（按优先级）

| # | 优先级 | 标题 | 状态 | 完成说明 |
|---|--------|------|------|----------|
| 1 | P0 | 翻译脚本 fail-fast + Agnes provider | ✅ 完成 | `translate-notes.js` 改为多 provider（Agnes 主、ModelScope 备），无 key 即 `process.exit(1)`；实测 Agnes `agnes-2.0-flash` 译文质量优，已加 `stripFences` 处理 frontmatter |
| 2 | P0 | 密钥/缓存文件泄露 | ✅ 完成 | `scraped_cache.json` 仅含 Moodle URL/元数据（无凭证）；已入 `.gitignore` 并 `git rm --cached`。注意：`.env` 含明文 Moodle 密码，建议改密 |
| 3 | P0 | 质量门禁（测试+lint+CI） | ✅ 完成 | 加 Vitest（5 个 `deriveGraph` 测试通过）、ESLint 加 `no-explicit-any: warn`、`@typescript-eslint/no-require-imports` 对 `.cjs` 关闭、新增 `.github/workflows/ci.yml`（bun install/lint/test/build） |
| 4 | P1 | 课程目录一致性 | ✅ 完成 | 删 `materials/semester-1/research-professional-skills/`，三处文档对齐到真实目录 `COMPSCI5092-research-professional-skills` |
| 5 | P1 | 类型安全：去 `any` + 抽公共树过滤 | ✅ 完成 | 抽 `src/lib/tree-utils.ts`（`PageTree.Root` 定型）；`notes`/`quizzes`/`debug` 三处改为调用；`build-graph.ts` 抽纯函数 `deriveGraph` 可测。`no-explicit-any` 计数 0 |
| 6 | P1 | `search.tsx` 空上下文崩溃 | ✅ 完成 | `useChatContext()` 改为 null-check 抛明确错误 |
| 7 | P1 | 根 `layout.tsx` `<html lang>` 硬编码 | ✅ 完成 | 根 layout 改为 pass-through，`<html lang={lang}>` 移到 `[lang]/layout.tsx`；实测 `/zh`→`zh`、`/en`→`en` |

## 延后（可选，非必要）

- 统一 Bun、脚本 ESM 去重、Context7 降级说明、`tailwind.config.ts` 死文件、`markdown.tsx` 缓存上限、`search.tsx` 弃用命名、PDF 提取/转换效率。
- `fumadocs/` 目录未被 git 跟踪（`git ls-files` 为空），仅本地清理即可，不计。

## 验证

- [x] P0 全部完成
- [x] `next build` + `bun test` 通过（tsc 0 错误 / lint 0 错误 / 5 tests / build 成功）
- [ ] 图片路径审计（CI 中可加 `grep` 步骤，暂未实现）
- [x] `git ls-files scripts/scraped_cache.json` 为空

最后更新：2026-07-09（全部必要项已完成）
