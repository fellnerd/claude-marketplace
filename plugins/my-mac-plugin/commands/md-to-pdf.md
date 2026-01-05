---
description: Konvertiert Markdown-Datei zu PDF mit Pandoc
---

# Markdown zu PDF: {{FILE_NAME}}

Konvertiert eine Markdown-Datei zu PDF mit Pandoc und LaTeX.

## Voraussetzungen prüfen

```bash
# Pandoc installiert?
pandoc --version | head -1 || echo "❌ Pandoc nicht installiert: brew install pandoc"

# LaTeX installiert?
which pdflatex > /dev/null && echo "✅ pdflatex gefunden" || echo "❌ LaTeX nicht installiert: brew install --cask mactex-no-gui"
```

## Standard-Konvertierung

```bash
cd "{{WORKSPACE_FOLDER}}" && PATH="/Library/TeX/texbin:$PATH" pandoc "{{FILE_NAME}}.md" -o "{{FILE_NAME}}.pdf" --pdf-engine=pdflatex -V geometry:margin=2.5cm -V fontsize=11pt
```

## Mit Inhaltsverzeichnis

```bash
cd "{{WORKSPACE_FOLDER}}" && PATH="/Library/TeX/texbin:$PATH" pandoc "{{FILE_NAME}}.md" -o "{{FILE_NAME}}.pdf" --pdf-engine=pdflatex -V geometry:margin=2.5cm -V fontsize=11pt --toc
```

## Mit Custom-Titel und Autor

```bash
cd "{{WORKSPACE_FOLDER}}" && PATH="/Library/TeX/texbin:$PATH" pandoc "{{FILE_NAME}}.md" -o "{{FILE_NAME}}.pdf" --pdf-engine=pdflatex -V geometry:margin=2.5cm -V fontsize=11pt -V title="{{TITLE}}" -V author="{{AUTHOR}}" -V date="$(date +%d.%m.%Y)"
```

## Optionen

| Option | Beschreibung |
|--------|--------------|
| `--toc` | Inhaltsverzeichnis hinzufügen |
| `-V geometry:margin=Xcm` | Seitenränder (Standard: 2.5cm) |
| `-V fontsize=Xpt` | Schriftgröße (10pt, 11pt, 12pt) |
| `-V documentclass=article` | Dokumentklasse |
| `--highlight-style=tango` | Code-Highlighting Style |
| `-N` | Überschriften nummerieren |

## PDF öffnen

```bash
open "{{WORKSPACE_FOLDER}}/{{FILE_NAME}}.pdf"
```

## Placeholders

- `{{WORKSPACE_FOLDER}}`: Aktueller Workspace-Pfad
- `{{FILE_NAME}}`: Dateiname ohne .md Endung
- `{{TITLE}}`: Dokumenttitel (optional)
- `{{AUTHOR}}`: Autor (optional)

## Beispiel

```
/md-to-pdf README
```

Konvertiert `README.md` zu `README.pdf` im aktuellen Workspace.
