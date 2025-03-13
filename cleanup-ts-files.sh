#!/bin/bash

# Find TypeScript files that have JavaScript equivalents and remove them
find src -name "*.tsx" | while read file; do
  js_file="${file/.tsx/.jsx}"
  if [ -f "$js_file" ]; then
    echo "Removing $file (JavaScript version exists at $js_file)"
    rm "$file"
  fi
done

find src -name "*.ts" | grep -v "d.ts" | while read file; do
  js_file="${file/.ts/.js}"
  if [ -f "$js_file" ]; then
    echo "Removing $file (JavaScript version exists at $js_file)"
    rm "$file"
  fi
done

# Remove TypeScript configuration files
rm -f tsconfig.json next-env.d.ts next.config.ts

echo "Cleanup completed. TypeScript files with JavaScript equivalents have been removed." 