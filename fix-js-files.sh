#!/bin/bash

# Find files to modify
find src -name "*.jsx" -o -name "*.js" | while read file; do
  echo "Checking $file for TypeScript annotations..."
  
  # Look for TypeScript annotations
  if grep -q -E '(: \w+(\[\])?)|(<\w+(\[\])?(\s*,\s*\w+(\[\])?)?>)' "$file"; then
    echo "TypeScript annotations found in $file"
    echo "-------------------------------"
    grep -n -E '(: \w+(\[\])?)|(<\w+(\[\])?(\s*,\s*\w+(\[\])?)?>)' "$file"
    echo "-------------------------------"
  fi
done

echo ""
echo "To convert your project fully to JavaScript, you need to manually edit these files to:"
echo "1. Remove TypeScript type annotations (e.g., ': string', ': React.FC<Props>', etc.)"
echo "2. Remove type and interface definitions"
echo "3. Simplify function parameters by removing type annotations"
echo ""
echo "Example:"
echo "  - From: function handleChange(e: React.ChangeEvent<HTMLInputElement>)"
echo "  - To:   function handleChange(e)"
echo ""
echo "Restart your Next.js development server after making these changes." 