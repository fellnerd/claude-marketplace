---
description: Zeigt wichtige Umgebungsvariablen und Shell-Config
---

# Umgebungsvariablen

Zeigt und analysiert die Shell-Umgebung.

## Wichtige Variablen

```bash
echo "HOME:    $HOME"
echo "USER:    $USER"
echo "SHELL:   $SHELL"
echo "TERM:    $TERM"
echo "EDITOR:  ${EDITOR:-nicht gesetzt}"
echo "LANG:    $LANG"
```

## PATH anzeigen (lesbar)

```bash
echo $PATH | tr ':' '\n' | nl
```

## Alle Umgebungsvariablen

```bash
env | sort
```

## Variable suchen: {{VAR_NAME}}

```bash
env | grep -i "{{VAR_NAME}}"
```

## Shell-Profile

```bash
echo "=== Aktive Shell-Configs ==="
for f in ~/.zshrc ~/.zprofile ~/.bashrc ~/.bash_profile ~/.profile; do
  [ -f "$f" ] && echo "✅ $f ($(wc -l < "$f") Zeilen)" || echo "❌ $f"
done
```

## Aliase anzeigen

```bash
alias
```

## Node/Python/Ruby Versionen

```bash
echo "Node:   $(node --version 2>/dev/null || echo 'nicht installiert')"
echo "npm:    $(npm --version 2>/dev/null || echo 'nicht installiert')"
echo "Python: $(python3 --version 2>/dev/null || echo 'nicht installiert')"
echo "Ruby:   $(ruby --version 2>/dev/null || echo 'nicht installiert')"
echo "Go:     $(go version 2>/dev/null || echo 'nicht installiert')"
echo "Rust:   $(rustc --version 2>/dev/null || echo 'nicht installiert')"
```

## Shell neu laden

```bash
source ~/.zshrc
echo "Shell-Konfiguration neu geladen"
```
