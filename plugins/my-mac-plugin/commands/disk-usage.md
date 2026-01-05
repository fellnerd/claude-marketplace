---
description: Sucht nach großen Dateien und Ordnern
---

# Speicherplatz-Analyse

Findet große Dateien und Ordner um Speicherplatz freizugeben.

## Übersicht

```bash
# Gesamter Speicher
df -h /

# Home-Verzeichnis Größe
du -sh ~
```

## Größte Ordner im Home

```bash
du -sh ~/* 2>/dev/null | sort -hr | head -15
```

## Größte Ordner: {{PATH}}

```bash
du -sh {{PATH}}/* 2>/dev/null | sort -hr | head -15
```

## Große Dateien finden (>100MB)

```bash
find ~ -type f -size +100M 2>/dev/null | head -20 | while read f; do
  du -sh "$f"
done
```

## Bekannte Speicherfresser

```bash
echo "=== Entwickler-Caches ==="
du -sh ~/Library/Caches 2>/dev/null
du -sh ~/Library/Developer 2>/dev/null
du -sh ~/.npm 2>/dev/null
du -sh ~/.gradle 2>/dev/null
du -sh ~/.cargo 2>/dev/null
du -sh ~/Library/Application\ Support/Docker 2>/dev/null

echo ""
echo "=== Downloads & Trash ==="
du -sh ~/Downloads 2>/dev/null
du -sh ~/.Trash 2>/dev/null
```

## node_modules finden

```bash
find ~ -name "node_modules" -type d -prune 2>/dev/null | while read dir; do
  du -sh "$dir"
done | sort -hr | head -10
```

## Alte Downloads aufräumen (>30 Tage)

⚠️ **Zeige zuerst die Dateien, frage dann nach Bestätigung!**

```bash
# Anzeigen
find ~/Downloads -type f -mtime +30 -exec ls -lh {} \;

# Löschen (nach Bestätigung)
find ~/Downloads -type f -mtime +30 -delete
```
