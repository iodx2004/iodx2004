#!/bin/bash

# Script to count lines of code in various programming languages
# This will be used to generate statistics for the README

echo "Counting lines of code..."

# Initialize counters
total_lines=0
cpp_lines=0
c_lines=0
python_lines=0
javascript_lines=0
typescript_lines=0
java_lines=0
other_lines=0

# Find and count lines in different file types
if [ -d "/workspace" ]; then
  # Count C++ files
  for file in $(find /workspace -name "*.cpp" -o -name "*.cxx" -o -name "*.cc" -o -name "*.hpp" -o -name "*.hxx" -o -name "*.h"); do
    count=$(wc -l < "$file")
    cpp_lines=$((cpp_lines + count))
  done
  
  # Count C files
  for file in $(find /workspace -name "*.c" -o -name "*.h" | grep -v ".hpp\|.hxx"); do
    count=$(wc -l < "$file")
    c_lines=$((c_lines + count))
  done
  
  # Count Python files
  for file in $(find /workspace -name "*.py"); do
    count=$(wc -l < "$file")
    python_lines=$((python_lines + count))
  done
  
  # Count JavaScript files
  for file in $(find /workspace -name "*.js" -o -name "*.jsx"); do
    count=$(wc -l < "$file")
    javascript_lines=$((javascript_lines + count))
  done
  
  # Count TypeScript files
  for file in $(find /workspace -name "*.ts" -o -name "*.tsx"); do
    count=$(wc -l < "$file")
    typescript_lines=$((typescript_lines + count))
  done
  
  # Count Java files
  for file in $(find /workspace -name "*.java"); do
    count=$(wc -l < "$file")
    java_lines=$((java_lines + count))
  done
  
  # Calculate total
  total_lines=$((cpp_lines + c_lines + python_lines + javascript_lines + typescript_lines + java_lines))
  
  # Count other files if needed
  other_extensions=("go" "rs" "php" "rb" "swift" "kt" "kts" "scala" "sql" "sh" "bash")
  for ext in "${other_extensions[@]}"; do
    for file in $(find /workspace -name "*.$ext"); do
      count=$(wc -l < "$file")
      other_lines=$((other_lines + count))
    done
  done
  
  total_lines=$((cpp_lines + c_lines + python_lines + javascript_lines + typescript_lines + java_lines + other_lines))
fi

# Output results in JSON format for potential API use
cat << EOF
{
  "total_lines": $total_lines,
  "cpp_lines": $cpp_lines,
  "c_lines": $c_lines,
  "python_lines": $python_lines,
  "javascript_lines": $javascript_lines,
  "typescript_lines": $typescript_lines,
  "java_lines": $java_lines,
  "other_lines": $other_lines
}
EOF