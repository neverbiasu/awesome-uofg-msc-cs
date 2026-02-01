
#!/bin/bash

# Configuration
COURSE_CODE="COMPSCI5012" # Updated to use only Course ID
IMAGE_DIR="public/images/COMPSCI5012-internet-technology"
REPORT_HINT="IT-Lectures"
BATCH_SIZE=5

# Get total number of image files
# Note: This is a rough count. The script itself does the definitive filtering.
# We'll use a high enough number to ensure all are processed.
# From previous run, we know it's around 224. Let's set loop for 250 to be safe.
TOTAL_IMAGES=250 
NUM_BATCHES=$(( (TOTAL_IMAGES + BATCH_SIZE - 1) / BATCH_SIZE ))

echo "Starting AI analysis for ${TOTAL_IMAGES} images in ${NUM_BATCHES} batches..."
echo "This will take a very long time."

for i in $(seq 0 $((NUM_BATCHES - 1))); do
  OFFSET=$((i * BATCH_SIZE))
  echo "--- Processing Batch $((i + 1)) of ${NUM_BATCHES} (Offset: ${OFFSET}) ---"
  
  node scripts/analyze-images.js "${IMAGE_DIR}" "${COURSE_CODE}" "${REPORT_HINT}" --limit=${BATCH_SIZE} --offset=${OFFSET}
  
  # Be nice to the API and local system
  sleep 1
done

echo "--- All Batches Processed ---"
