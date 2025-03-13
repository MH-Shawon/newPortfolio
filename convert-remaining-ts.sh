#!/bin/bash

# Convert remaining TypeScript files to JavaScript
find src -name "*.ts" | grep -v "d.ts" | while read file; do
  js_file="${file/.ts/.js}"
  echo "Converting $file to $js_file"
  
  # Create JavaScript version
  cp "$file" "$js_file"
  
  # Remove TypeScript type annotations
  sed -i 's/\(([^)]*\):[^,)]*\([,)]\)/\1\2/g' "$js_file"
  sed -i 's/: React\.FC<[^>]*>//g' "$js_file"
  sed -i 's/useState<[^>]*>/useState/g' "$js_file"
  sed -i 's/useRef<[^>]*>/useRef/g' "$js_file"
  sed -i '/^interface /d' "$js_file"
  sed -i '/^type /d' "$js_file"
  sed -i 's/\([a-zA-Z0-9_]*\): \([a-zA-Z0-9_]*\);/\1;/g' "$js_file"
  sed -i 's/): \([a-zA-Z0-9_<>]*\) =>/)/g' "$js_file"
  sed -i 's/: string//g' "$js_file"
  sed -i 's/: number//g' "$js_file"
  sed -i 's/: boolean//g' "$js_file"
  sed -i 's/: any//g' "$js_file"
  sed -i 's/: void//g' "$js_file"
  sed -i 's/: NextRequest//g' "$js_file"
  sed -i 's/: File//g' "$js_file"
  
  # Remove import type statements
  sed -i 's/import type { [^}]* } from "[^"]*";//g' "$js_file"
  sed -i 's/import { NextRequest, /import { /g' "$js_file"
  
  echo "Converted $file to $js_file"
done

# Run cleanup script to remove TypeScript files
./cleanup-ts-files.sh

echo "All TypeScript files have been converted to JavaScript." 