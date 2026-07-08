
# 项目改进看板 (Kanban / TODO)

来源：代码评审报告（2026-07-08，基于 `code-review-and-quality` 五轴框架）
范围：awesome-uofg-msc-cs 仓库结构与代码质量

## 看板总览

| 状态 | 数量 | 说明 |
|------|------|------|
| 待办 (Backlog) | 7 | 已识别、未开始 |
| 进行中 (In Progress) | 0 | - |
| 已完成 (Done) | 0 | - |

优先级图例：**P0** = 必须修（Critical/安全）｜**P1** = 建议修（正确性/一致性）｜**P2** = 可选（卫生/优化）

---

## 待办 (Backlog)

### P0 — 必须修

- [ ] **T1** 统一 COMPSCI5092 目录命名，修正 `scripts/complete-scraper.js:45` 的 `localPath`
  - 现状：`materials/semester-1/` 下同时存在 `COMPSCI5092-research-professional-skills/`（有 lectures/resources）与 `research-professional-skills/`（仅 index.md），内容分裂。
  - 动作：确定唯一目录名，更新 scraper 配置，迁移错落文件。
  - 关联：`copilot-instructions.md` 已标注此坑。

- [ ] **T2** 将 `scripts/scraped_cache.json` 加入 `.gitignore`
  - 现状：该文件记录爬取状态，可能含 Moodle 会话痕迹，当前未被忽略（搜索 `.gitignore` 无匹配）。
  - 动作：在 `.gitignore` 追加 `scripts/scraped_cache.json`，并确认未误提交。

- [ ] **T3** `scripts/translate-notes.js` 改为 fail-fast，删除伪造翻译
  - 现状：缺 `MODELSCOPE_API_KEY` 时，frontmatter 被改写为 `title: "..." (Translated)`，属假翻译。
  - 动作：无 key 时显式报错退出，而非伪造内容。

### P1 — 建议修

- [ ] **T4** 合并重复的 PPTX→PDF 转换器
  - 现状：`convert-pptx-to-pdf.mjs`（ESM）与 `convert-pptx-to-pdf.cjs`（CJS）功能重复。
  - 动作：保留 ESM 版，删除 `.cjs`，统一调用入口。

- [ ] **T5** 抽出课程表为单一数据源
  - 现状：`complete-scraper.js` 的 `COURSES` 大对象与 `copilot-instructions.md` 课程表重复维护，不同步即出错（正是 T1 根因）。
  - 动作：建 `config/courses.json`，scraper 与文档均引用，消除双源。

- [ ] **T6** 为 `src/lib/build-graph.ts` 与 `src/lib/source.ts` 补最小单测
  - 现状：全仓零测试（`grep` 仅命中 `process.exit` 与 `path.split`），核心逻辑无回归保护；`build-graph.ts` 依赖 `page._file.path` 内部字段，Fumadocs 升级易破裂。
  - 动作：加 Vitest 用例覆盖父子链接推导与 loader 初始化；在 `build-graph.ts` 标注内部 API 风险。

- [ ] **T7** 明确技能对 Context7 MCP 的依赖与降级路径
  - 现状：`note-reviewer` / `fumadocs-expert` 声明依赖 `upstash/context7`，但当前环境未挂载该 MCP，会静默降级。
  - 动作：在技能文件写明"无 Context7 时的降级路径"，或接入该 MCP。

### P2 — 可选

- [ ] **T8** 统一 `scripts/` 为 ESM（删除 `.cjs` / `.py` 历史包袱）
  - 现状：`package.json` 为 `"type": "module"`，但脚本混用 `.js`/`.mjs`/`.cjs`/`.py`。
  - 动作：逐步迁移至 `.mjs`，清理 `.cjs`。

- [ ] **T9** `extract-materials.js` PDF 提取改为流式/并发
  - 现状：同步 `readFileSync` + 逐页串行，大 PDF 偏慢（一次性批处理，非瓶颈）。
  - 动作：按需优化，参数化并发度。

- [ ] **T10** `convert-pdf-to-images.mjs` 的 `scale` 参数化
  - 现状：固定 `scale: 2`，大课件生成体积可观的 PNG。
  - 动作：按用途（网页展示 vs OCR）暴露参数。

- [ ] **T11** 补最小 CI：lint + `next build` + 图片路径审计
  - 现状：无 CI；`note-reviewer` 已有图片路径校验命令但未自动化。
  - 动作：加 GitHub Actions 跑 `eslint`、`next build`、以及 `grep -rh "/images/" notes/ ...` 审计。

---

## 可沉淀为专用 Agent 的经验

| 候选 Agent | 沉淀经验 | 触发场景 | 对应任务 |
|------------|----------|----------|----------|
| `course-config-sync` | 课程表是唯一真相源；scraper 路径、目录命名、指令文档三方一致 | 新增/重命名课程、改目录结构前 | T1, T5 |
| `mdx-bilingual-mirror` | EN/ZH 文件名、结构、卡片数对称；中文标题禁英文词；链接以 `/${lang}/notes/` 开头 | 生成或改动任一语言分支后 | - |
| `asset-path-auditor` | 每条 `/images/...` 路径须在 `public/` 存在；图片须来自正确 `week<N>` 且内容匹配 | 笔记生成后 | T11 |
| `script-hygiene` | 统一 ESM、删重复实现、缓存文件入 gitignore、翻译脚本 fail-fast | 提交 `scripts/` 改动前 | T2, T3, T4, T8 |
| `fumadocs-version-guard` | 监控 `page._file.path` 等内部 API、Context7 缺失降级 | Fumadocs 升级或 CI 中 | T6, T7 |

最高优先级：`course-config-sync` 与 `script-hygiene` —— 直接对应本次 Critical/重复问题，可自动化防范同类错误复发。

---

## 验证记录

- [ ] 所有 P0 已解决
- [ ] 所有 P1 已解决或显式延期并说明
- [ ] `next build` 通过
- [ ] 图片路径审计通过

最后更新：2026-07-08
