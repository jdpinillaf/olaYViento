#!/usr/bin/env python3
import markdown
from weasyprint import HTML

# Read markdown
with open('docs/propuestas/factura-sistema-resenas.md', 'r') as f:
    md_content = f.read()

# Convert markdown to HTML
html_body = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])

# Wrap in styled HTML
html = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<style>
  @page {{
    size: letter;
    margin: 2cm 2.5cm;
    @bottom-center {{
      content: "Pagina " counter(page) " de " counter(pages);
      font-size: 9px;
      color: #999;
    }}
  }}
  body {{
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 11px;
    line-height: 1.6;
    color: #1a1a2e;
  }}
  h1 {{
    font-size: 22px;
    color: #1a1a2e;
    border-bottom: 3px solid #FCA424;
    padding-bottom: 8px;
    margin-bottom: 4px;
  }}
  h2 {{
    font-size: 16px;
    color: #54ADDB;
    margin-top: 24px;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 4px;
  }}
  h3 {{
    font-size: 13px;
    color: #1a1a2e;
    margin-top: 16px;
  }}
  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 16px 0;
    font-size: 10.5px;
  }}
  th, td {{
    border: 1px solid #ddd;
    padding: 6px 10px;
    text-align: left;
  }}
  th {{
    background-color: #54ADDB;
    color: white;
    font-weight: bold;
  }}
  tr:nth-child(even) {{
    background-color: #f8f9fa;
  }}
  strong {{
    color: #1a1a2e;
  }}
  hr {{
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 16px 0;
  }}
  code {{
    background: #f0f0f0;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 10px;
  }}
  ol, ul {{
    padding-left: 20px;
  }}
  li {{
    margin-bottom: 4px;
  }}
  em {{
    color: #666;
  }}
</style>
</head>
<body>
{html_body}
</body>
</html>"""

# Generate PDF
output_path = 'docs/propuestas/factura-sistema-resenas.pdf'
HTML(string=html).write_pdf(output_path)
print(f"PDF generado: {output_path}")
