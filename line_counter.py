#!/usr/bin/env python3
"""
Script to count lines of code in various programming languages
and generate statistics for the README
"""

import os
import json
from pathlib import Path


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
        # Skip hidden directories
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        for file in files:
            filepath = Path(root) / file
            extension = filepath.suffix.lower()
            
            # Skip non-text files that are likely binary
            if extension in ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.zip', '.tar', '.gz', '.exe', '.bin', '.o', '.obj']:
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
                if extension not in ['.md', '.txt', '.json', '.yml', '.yaml', '.xml', '.html', '.css']:
                    lines = count_lines_in_file(filepath)
                    if 'Other' not in stats:
                        stats['Other'] = 0
                    stats['Other'] += lines
                    total_lines += lines
    
    return stats, total_lines


def generate_readme_section(stats, total_lines):
    """Generate markdown section for README"""
    markdown = "## 📊 Code Statistics\n\n"
    markdown += f"**Total Lines of Code: {total_lines:,}**\n\n"
    
    # Sort languages by line count
    sorted_stats = sorted(stats.items(), key=lambda x: x[1], reverse=True)
    
    for lang, count in sorted_stats:
        if count > 0:
            percentage = (count / total_lines) * 100
            markdown += f"- **{lang}**: {count:,} lines ({percentage:.1f}%)\n"
    
    markdown += "\n_Live count updated on: " + str(__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')) + "_\n"
    
    return markdown


def main():
    # Get current directory (or you can pass a specific directory)
    directory = os.path.dirname(os.path.abspath(__file__))
    
    # Get statistics
    stats, total_lines = get_language_stats(directory)
    
    # Print JSON for potential API use
    result = {
        "total_lines": total_lines,
        **{lang: count for lang, count in stats.items()}
    }
    print(json.dumps(result, indent=2))
    
    # Generate README section
    readme_section = generate_readme_section(stats, total_lines)
    print("\n--- README Section ---\n")
    print(readme_section)


if __name__ == "__main__":
    main()