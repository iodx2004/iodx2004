# Live Code Statistics Update Instructions

This README includes live code statistics that count all code lines by language. To update these statistics, run:

```bash
python3 /workspace/update_readme_stats.py
```

## Files Created

1. `update_readme_stats.py` - Main script to update README with live code statistics
2. `line_counter.py` - Helper script to count lines by language
3. `count_lines.sh` - Bash script to count lines (alternative method)

## How It Works

- The script scans all files in the workspace directory
- Counts lines of code by programming language
- Updates the "Code Statistics" section in README.md
- Shows total line count and percentage by language
- Includes timestamp of last update

## Supported Languages

- C++ (.cpp, .cxx, .cc, .hpp, .hxx, .h)
- C (.c)
- Python (.py)
- JavaScript (.js, .jsx)
- TypeScript (.ts, .tsx)
- Java (.java)
- Go (.go)
- Rust (.rs)
- PHP (.php)
- Ruby (.rb)
- Swift (.swift)
- Kotlin (.kt, .kts)
- Scala (.scala)
- SQL (.sql)
- Shell (.sh, .bash)

## Updating Statistics

Run the update script whenever you want to refresh the code statistics:

```bash
python3 /workspace/update_readme_stats.py
```

This will update the statistics section in your README with the current line counts across all supported file types.