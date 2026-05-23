import os
import re

def fix_imports_and_structure(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return

    # 1. Separate Metadata, Imports, and Content
    title, desc, date = "", "", ""
    in_fm = False
    content_lines = []
    
    # Store imports as {component_name: source} to detect duplicates
    # e.g., {"Callout": "fumadocs-ui/components/callout"}
    imports_map = {}
    
    # Simple regex for import { A, B } from 'source'
    import_re = re.compile(r"import\s+\{\s*([^}]+)\s*\}\s+from\s+['\"]([^']+)['\"]")

    raw_body_lines = []
    
    for line in lines:
        stripped = line.strip()
        if stripped == "---":
            in_fm = not in_fm
            continue
        
        if in_fm:
            if line.startswith("title:"): title = line.split(":", 1)[1].strip().strip('"').strip("'")
            elif line.startswith("description:"): desc = line.split(":", 1)[1].strip().strip('"').strip("'")
            elif line.startswith("date:"): date = line.split(":", 1)[1].strip().strip('"').strip("'")
        else:
            match = import_re.match(stripped)
            if match:
                components = [c.strip() for c in match.group(1).split(",")]
                source = match.group(2).strip()
                for comp in components:
                    imports_map[comp] = source
            else:
                raw_body_lines.append(line)

    # 2. Process Content: Wrap naked code and preserve structure
    final_body = []
    in_code_block = False
    for line in raw_body_lines:
        if line.startswith("```"):
            in_code_block = not in_code_block
            final_body.append(line)
            continue
            
        if not in_code_block and (line.startswith("import ") or line.startswith("from ")):
            # If it's a naked import (likely Python), wrap it
            final_body.append(f"```python\n{line.strip()}\n```\n")
        else:
            final_body.append(line)

    # 3. Reconstruct
    output = ["---\n"]
    if title: output.append(f'title: "{title}"\n')
    if desc: output.append(f'description: "{desc}"\n')
    if date: output.append(f'date: "{date}"\n')
    output.append("---\n\n")
    
    # Group components by source for cleaner imports
    source_to_comps = {}
    for comp, src in imports_map.items():
        if src not in source_to_comps: source_to_comps[src] = set()
        source_to_comps[src].add(comp)
        
    for src in sorted(source_to_comps.keys()):
        comps = ", ".join(sorted(list(source_to_comps[src])))
        output.append(f"import {{ {comps} }} from '{src}';\n")
    
    if source_to_comps:
        output.append("\n")
        
    output.extend(final_body)
    
    # 4. Final Polish: remove excessive newlines
    final_str = "".join(output)
    final_str = re.sub(r'\n{3,}', '\n\n', final_str)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(final_str)

if __name__ == "__main__":
    for root, dirs, files in os.walk('notes'):
        for file in files:
            if file.endswith('.mdx'):
                fix_imports_and_structure(os.path.join(root, file))
