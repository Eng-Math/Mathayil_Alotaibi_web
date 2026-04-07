import os, zipfile, re

base = '/home/azo/Documents/mtayel_proj/mathayil-alotaibi-portfolio/mta/app/MTA_PRO'
output_file = '/home/azo/Documents/mtayel_proj/mathayil-alotaibi-portfolio/mta/app/extracted_content.txt'

with open(output_file, 'w', encoding='utf-8') as out:
    # List all files
    for root, dirs, files in os.walk(base):
        for f in files:
            full = os.path.join(root, f)
            rel = os.path.relpath(full, base)
            out.write(f"FILE: {rel} ({os.path.getsize(full)} bytes)\n")

    out.write("\n\n=== DOCX CONTENT ===\n\n")

    # Read DOCX
    docx_path = None
    for f in os.listdir(base):
        if f.endswith('.docx'):
            docx_path = os.path.join(base, f)
            break

    if docx_path:
        z = zipfile.ZipFile(docx_path)
        content = z.read('word/document.xml').decode('utf-8')
        text = re.sub(r'<[^>]+>', '\n', content)
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        out.write('\n'.join(lines))
    
    out.write("\nDONE\n")
