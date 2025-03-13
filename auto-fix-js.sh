#!/bin/bash

# Find JavaScript files
find src -name "*.jsx" -o -name "*.js" | while read file; do
  echo "Processing $file..."
  
  # Remove TypeScript type annotations
  # 1. Remove type annotations from function parameters
  sed -i 's/\(([^)]*\):[^,)]*\([,)]\)/\1\2/g' "$file"
  
  # 2. Remove React.FC<Props> and similar type annotations
  sed -i 's/: React\.FC<[^>]*>//g' "$file"
  
  # 3. Remove useState<Type> annotations
  sed -i 's/useState<[^>]*>/useState/g' "$file"
  
  # 4. Remove useRef<Type> annotations
  sed -i 's/useRef<[^>]*>/useRef/g' "$file"
  
  # 5. Remove interface and type definitions
  sed -i '/^interface /d' "$file"
  sed -i '/^type /d' "$file"
  
  # 6. Remove property type annotations in objects
  sed -i 's/\([a-zA-Z0-9_]*\): \([a-zA-Z0-9_]*\);/\1;/g' "$file"
  
  # 7. Remove return type annotations
  sed -i 's/): \([a-zA-Z0-9_<>]*\) =>/)/g' "$file"
  
  echo "Processed $file"
done

echo "Automatic TypeScript annotation removal completed."
echo "You may still need to manually check and fix some files." 