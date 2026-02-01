
#!/bin/bash

# Configuration
COURSE_CODE="COMPSCI5012" # Updated to use only Course ID
IMAGE_DIR="public/images/COMPSCI5012-internet-technology"
BATCH_SIZE=5

# --- L0 ---
REPORT_HINT_L0="L0"
# Rough count for L0 is ~11 images
TOTAL_IMAGES_L0=15 
NUM_BATCHES_L0=$(( (TOTAL_IMAGES_L0 + BATCH_SIZE - 1) / BATCH_SIZE ))

echo "--- Starting L0 Analysis (${NUM_BATCHES_L0} batches) ---"
for i in $(seq 0 $((NUM_BATCHES_L0 - 1))); do
  OFFSET=$((i * BATCH_SIZE))
  echo "--- L0: Processing Batch $((i + 1)) of ${NUM_BATCHES_L0} (Offset: ${OFFSET}) ---"
  node scripts/analyze-images.js "${IMAGE_DIR}" "${COURSE_CODE}" "${REPORT_HINT_L0}" --limit=${BATCH_SIZE} --offset=${OFFSET}
  sleep 1
done

# --- L1 ---
REPORT_HINT_L1="L1"
# Rough count for L1 is ~83 images
TOTAL_IMAGES_L1=85 
NUM_BATCHES_L1=$(( (TOTAL_IMAGES_L1 + BATCH_SIZE - 1) / BATCH_SIZE ))

echo "--- Starting L1 Analysis (${NUM_BATCHES_L1} batches) ---"
for i in $(seq 0 $((NUM_BATCHES_L1 - 1))); do
  OFFSET=$((i * BATCH_SIZE))
  echo "--- L1: Processing Batch $((i + 1)) of ${NUM_BATCHES_L1} (Offset: ${OFFSET}) ---"
  node scripts/analyze-images.js "${IMAGE_DIR}" "${COURSE_CODE}" "${REPORT_HINT_L1}" --limit=${BATCH_SIZE} --offset=${OFFSET}
  sleep 1
done

# --- L2 ---
REPORT_HINT_L2="L2"
# Rough count for L2 is ~89 images
TOTAL_IMAGES_L2=90
NUM_BATCHES_L2=$(( (TOTAL_IMAGES_L2 + BATCH_SIZE - 1) / BATCH_SIZE ))

echo "--- Starting L2 Analysis (${NUM_BATCHES_L2} batches) ---"
for i in $(seq 0 $((NUM_BATCHES_L2 - 1))); do
  OFFSET=$((i * BATCH_SIZE))
  echo "--- L2: Processing Batch $((i + 1)) of ${NUM_BATCHES_L2} (Offset: ${OFFSET}) ---"
  node scripts/analyze-images.js "${IMAGE_DIR}" "${COURSE_CODE}" "${REPORT_HINT_L2}" --limit=${BATCH_SIZE} --offset=${OFFSET}
  sleep 1
done

# --- L3 ---
REPORT_HINT_L3="L3"
# Rough count for L3 is ~41 images
TOTAL_IMAGES_L3=45
NUM_BATCHES_L3=$(( (TOTAL_IMAGES_L3 + BATCH_SIZE - 1) / BATCH_SIZE ))

echo "--- Starting L3 Analysis (${NUM_BATCHES_L3} batches) ---"
for i in $(seq 0 $((NUM_BATCHES_L3 - 1))); do
  OFFSET=$((i * BATCH_SIZE))
  echo "--- L3: Processing Batch $((i + 1)) of ${NUM_BATCHES_L3} (Offset: ${OFFSET}) ---"
  node scripts/analyze-images.js "${IMAGE_DIR}" "${COURSE_CODE}" "${REPORT_HINT_L3}" --limit=${BATCH_SIZE} --offset=${OFFSET}
  sleep 1
done


echo "--- All Lecture Batches Processed ---"
