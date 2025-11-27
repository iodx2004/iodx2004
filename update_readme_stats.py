#!/usr/bin/env python3
"""
Script to update README.md with live code statistics
"""

import os
import json
from pathlib import Path
import re
from datetime import datetime


def count_lines_in_file(filepath):
    """Count lines in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
            return len(lines)
    except:
        return 0


def get_language_stats(directory):
    """Get line counts by language for all files in directory"""
    language_extensions = {
        'C++': ['.cpp', '.cxx', '.cc', '.hpp', '.hxx', '.h'],
        'C': ['.c'],
        'Python': ['.py'],
        'JavaScript': ['.js', '.jsx'],
        'TypeScript': ['.ts', '.tsx'],
        'Java': ['.java'],
        'Go': ['.go'],
        'Rust': ['.rs'],
        'PHP': ['.php'],
        'Ruby': ['.rb'],
        'Swift': ['.swift'],
        'Kotlin': ['.kt', '.kts'],
        'Scala': ['.scala'],
        'SQL': ['.sql'],
        'Shell': ['.sh', '.bash'],
    }
    
    stats = {}
    total_lines = 0
    
    for root, dirs, files in os.walk(directory):
        # Skip hidden directories like .git
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        for file in files:
            filepath = Path(root) / file
            extension = filepath.suffix.lower()
            
            # Skip non-text files that are likely binary
            if extension in ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.zip', '.tar', '.gz', '.exe', '.bin', '.o', '.obj', '.git']:
                continue
                
            for lang, exts in language_extensions.items():
                if extension in exts:
                    lines = count_lines_in_file(filepath)
                    if lang not in stats:
                        stats[lang] = 0
                    stats[lang] += lines
                    total_lines += lines
                    break
            else:
                # If not a recognized language, count as "Other"
                # Skip documentation and config files
                if extension not in ['.md', '.txt', '.json', '.yml', '.yaml', '.xml', '.html', '.css', '.gitignore', '.dockerignore']:
                    lines = count_lines_in_file(filepath)
                    if 'Other' not in stats:
                        stats['Other'] = 0
                    stats['Other'] += lines
                    total_lines += lines
    
    return stats, total_lines


def generate_code_stats_section(stats, total_lines):
    """Generate markdown section for code statistics"""
    markdown = "## 📊 Code Statistics\n<div align=\"center\">\n\n"
    markdown += f"**Total Lines of Code: {total_lines:,}**\n\n"
    
    # Sort languages by line count
    sorted_stats = sorted(stats.items(), key=lambda x: x[1], reverse=True)
    
    for lang, count in sorted_stats:
        if count > 0:
            percentage = (count / total_lines) * 100
            markdown += f"- **{lang}**: {count:,} lines ({percentage:.1f}%)\n"
    
    markdown += f"\n_Live count updated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}_\n\n</div>"
    
    return markdown


def update_readme_with_stats(readme_path):
    """Update README with current code statistics"""
    # Get current statistics
    stats, total_lines = get_language_stats(os.path.dirname(readme_path))
    
    # Generate new statistics section
    new_stats_section = generate_code_stats_section(stats, total_lines)
    
    # Read current README
    with open(readme_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace existing code statistics section if it exists, otherwise add it
    # Look for existing code statistics section
    pattern = r'## 📊 Code Statistics.*?(?=## [^#]|$)'
    if re.search(pattern, content, re.DOTALL):
        # Replace existing section
        content = re.sub(pattern, new_stats_section, content, 1, re.DOTALL)
    else:
        # Find a good place to insert the section (after the GitHub Stats section)
        github_stats_pattern = r'(## 📊 GitHub Stats.*?</div>\n)'
        if re.search(github_stats_pattern, content, re.DOTALL):
            content = re.sub(github_stats_pattern, r'\1\n' + new_stats_section + '\n\n---\n\n', content, 1, re.DOTALL)
        else:
            # If no GitHub Stats section found, add at the end before footer
            footer_pattern = r'(<br>\n\n<img width="100%" src="https://capsule-render\.vercel\.app/api\?type=waving&color=FFDE21&height=70&section=footer".*>)'
            content = re.sub(footer_pattern, new_stats_section + '\n\n---\n\n' + r'\1', content, 1)
    
    # Write updated content back to README
    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"README updated with live code statistics:")
    print(f"Total lines: {total_lines:,}")
    for lang, count in sorted(stats.items(), key=lambda x: x[1], reverse=True):
        if count > 0:
            percentage = (count / total_lines) * 100
            print(f"- {lang}: {count:,} lines ({percentage:.1f}%)")
    
    return stats, total_lines


def main():
    readme_path = "/workspace/README.md"
    
    if os.path.exists(readme_path):
        stats, total_lines = update_readme_with_stats(readme_path)
        
        # Print JSON for potential API use
        result = {
            "total_lines": total_lines,
            "timestamp": datetime.now().isoformat(),
            **{lang: count for lang, count in stats.items()}
        }
        print("\nJSON Output:")
        print(json.dumps(result, indent=2))
    else:
        print(f"README file not found at {readme_path}")


if __name__ == "__main__":
    main()