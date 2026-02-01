# SOP: Extract and Review Lecture Images

This prompt outlines a reliable, manual workflow to extract images from lecture PDFs and review them for manual insertion into notes.

**NOTE:** The AI analysis steps have been removed as they are unworkable due to external API rate limits and system memory constraints.

---

### 1. Extract Images from all PDFs

Use the `pdfimages` tool to extract all images from the PDFs for a given course.

```bash
# Set Variables
COURSE_CODE="COMPSCI5012-internet-technology"
SEMESTER_DIR="semester-2"
SOURCE_DIR="materials/${SEMESTER_DIR}/${COURSE_CODE}/lectures"
OUTPUT_DIR="public/images/${COURSE_CODE}"

# Create directory and run extraction
mkdir -p "${OUTPUT_DIR}"
for pdf_file in "${SOURCE_DIR}"/*.pdf; do
  if [ -f "${pdf_file}" ]; then
    pdf_filename_no_ext="$(basename -- "$pdf_file" .pdf)"
    echo "Extracting images from ${pdf_filename_no_ext}.pdf..."
    pdfimages -all "${pdf_file}" "${OUTPUT_DIR}/${pdf_filename_no_ext}"
  fi
done
echo "Image extraction complete."
```

---

### 2. Generate HTML Image Gallery

Run the `generate-image-review.js` script to create a simple HTML page that displays all the extracted images for easy visual review.

```bash
# Set Variable
COURSE_CODE="COMPSCI5012-internet-technology"
IMAGE_DIR="public/images/${COURSE_CODE}"

# Run the script
node scripts/generate-image-review.js "${IMAGE_DIR}"
```
This will create a file named `image_review.html` inside the `IMAGE_DIR`.

---

### 3. Manual Review and Insertion

1.  **Open** the generated `image_review.html` file in your browser.
2.  **Review** the images and identify which ones are useful for your notes.
3.  **Create** new `.mdx` note files in the appropriate `notes/` directory for your content (e.g., `notes/zh/semester-2/COMPSCI5012/week0/welcome-notes.mdx`).
4.  **Insert** the desired images into your new note files using the correct root-relative Markdown syntax (the path must start from `/images/...`, not `/public/images/...`).

**Example Markdown Syntax:**

To insert an image named `L0-Welcome_to_the_course-002.jpg`, you would add the following to your `.mdx` file:

```markdown
![Alt text describing the image](/images/COMPSCI5012-internet-technology/L0-Welcome_to_the_course-002.jpg)
```

This SOP provides a stable, manual workflow for processing lecture images and avoids the build errors caused by incorrect paths.