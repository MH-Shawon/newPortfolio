#!/bin/bash

# Find and rename TypeScript files to JavaScript
find src -name "*.tsx" -o -name "*.ts" | while read file; do
  # Skip TypeScript declaration files
  if [[ $file == *.d.ts ]]; then
    continue
  fi
  
  # Skip already converted files (if running script multiple times)
  if [[ -f "${file/.tsx/.jsx}" || -f "${file/.ts/.js}" ]]; then
    continue
  fi
  
  # Rename .tsx to .jsx and .ts to .js
  if [[ $file == *.tsx ]]; then
    new_file="${file/.tsx/.jsx}"
    cp "$file" "$new_file"
    echo "Renamed $file to $new_file"
  elif [[ $file == *.ts ]]; then
    new_file="${file/.ts/.js}"
    cp "$file" "$new_file"
    echo "Renamed $file to $new_file"
  fi
done

# Reminder to update imports and remove TypeScript syntax
echo "Files have been converted. You'll need to:"
echo "1. Update imports to reference .js/.jsx files"
echo "2. Remove TypeScript type annotations in each file"
echo "3. Delete tsconfig.json (if not already done)"
echo "4. Update package.json to remove TypeScript dependencies (if not already done)" 