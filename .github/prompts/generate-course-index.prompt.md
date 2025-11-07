# Prompt for Generating a Course Index Page

When asked to create or update a main index page for a course (e.g., for COMPSCI5089), follow these steps:

1.  **Identify the Goal**: The goal is to create an index page that links to all the topic-based subdirectories for that course.

2.  **Use the Template**: Base the new file on the `docs/templates/course-index-template.mdx`.

3.  **Find Subdirectories**: List the subdirectories within the course's notes folder (e.g., `notes/en/semester-1/<course-code>/`).

4.  **Manually Create Cards**:
    *   The `<Cards>` component does **not** automatically generate links.
    *   You must create one `<Card>` element for each topic subdirectory you found.

5.  **Use Absolute Paths with Language Code**:
    *   The `href` attribute for each `<Card>` **must** be an absolute path from the root of the website and **must** include the language code (`en` or `zh`).
    *   **Correct format**: `href="/en/notes/semester-1/<course-code>/<topic-slug>"`
    *   **Incorrect formats**: `href="/notes/semester-1/<course-code>/<topic-slug>"` or `href="./<topic-slug>"`

6.  **Provide Descriptions**: Write a brief, accurate, one-sentence description for each topic in the `description` prop of the `<Card>`.

7.  **Handle Both Languages**: Ensure that you create or update the index page for both English (`en`) and Chinese (`zh`) versions, translating titles and descriptions appropriately.