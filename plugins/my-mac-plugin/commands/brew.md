---
description: Homebrew Status, Updates und Wartung
---

# Homebrew Verwaltung

Verwalte Homebrew Pakete und führe Wartung durch.

## Status prüfen

```bash
# Homebrew Version
brew --version

# Installierte Pakete zählen
echo "Formulae: $(brew list --formula | wc -l | tr -d ' ')"
echo "Casks: $(brew list --cask | wc -l | tr -d ' ')"
```

## Updates prüfen

```bash
# Verfügbare Updates
brew outdated
```

## Alle Pakete aktualisieren

⚠️ **Frage vor dem Update um Bestätigung!**

```bash
brew update && brew upgrade
```

## Installierte Pakete auflisten

```bash
# Formulae (CLI tools)
brew list --formula

# Casks (GUI apps)
brew list --cask
```

## Paket suchen: {{PACKAGE}}

```bash
brew search {{PACKAGE}}
```

## Paket installieren: {{PACKAGE}}

```bash
# CLI Tool
brew install {{PACKAGE}}

# GUI App
brew install --cask {{PACKAGE}}
```

## Wartung durchführen

```bash
# Alte Versionen entfernen
brew cleanup --prune=all

# Probleme diagnostizieren
brew doctor
```

## Paket-Info: {{PACKAGE}}

```bash
brew info {{PACKAGE}}
```
