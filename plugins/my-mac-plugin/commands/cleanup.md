---
description: Räumt temporäre Dateien und Caches auf dem Mac auf
---

# Mac Cleanup

Bereinigt temporäre Dateien und Caches um Speicherplatz freizugeben.

## Warnung

⚠️ **Frage IMMER vor dem Ausführen um Bestätigung!**

## Schritt 1: Speicherverbrauch analysieren

```bash
# Aktuelle Nutzung
df -h /

# Große Ordner finden
du -sh ~/Library/Caches/* 2>/dev/null | sort -hr | head -10
```

## Schritt 2: Optionen präsentieren

> Welche Bereiche sollen bereinigt werden?
>
> 1. ☐ Homebrew Cache (`brew cleanup`)
> 2. ☐ npm Cache (`npm cache clean --force`)
> 3. ☐ Xcode DerivedData (`rm -rf ~/Library/Developer/Xcode/DerivedData/*`)
> 4. ☐ Docker (unused images/volumes)
> 5. ☐ Papierkorb leeren

## Schritt 3: Ausführen (nach Bestätigung)

```bash
# Homebrew
brew cleanup --prune=all

# npm
npm cache clean --force

# Xcode DerivedData
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# Docker
docker system prune -f
```

## Schritt 4: Ergebnis zeigen

```bash
df -h /
```

Zeige die Differenz des freien Speichers vorher/nachher.
