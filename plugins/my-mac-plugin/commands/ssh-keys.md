---
description: SSH-Schlüssel anzeigen und verwalten
---

# SSH-Schlüssel Verwaltung

Zeigt und verwaltet SSH-Schlüssel.

## Vorhandene Schlüssel anzeigen

```bash
ls -la ~/.ssh/*.pub 2>/dev/null || echo "Keine SSH-Schlüssel gefunden"
```

## Public Key anzeigen (zum Kopieren)

```bash
# Standard Ed25519
cat ~/.ssh/id_ed25519.pub 2>/dev/null || \
cat ~/.ssh/id_rsa.pub 2>/dev/null || \
echo "Kein Public Key gefunden"
```

## SSH-Agent Status

```bash
ssh-add -l 2>/dev/null || echo "SSH-Agent läuft nicht oder keine Keys geladen"
```

## Neuen SSH-Key erstellen

⚠️ **Frage nach E-Mail und Bestätigung!**

```bash
# Ed25519 (empfohlen)
ssh-keygen -t ed25519 -C "{{EMAIL}}"

# RSA (falls Ed25519 nicht unterstützt)
ssh-keygen -t rsa -b 4096 -C "{{EMAIL}}"
```

## Key zum Agent hinzufügen

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

## SSH-Verbindung testen

```bash
# GitHub
ssh -T git@github.com

# GitLab
ssh -T git@gitlab.com

# Custom Host
ssh -T {{USER}}@{{HOST}}
```

## SSH Config anzeigen

```bash
cat ~/.ssh/config 2>/dev/null || echo "Keine SSH Config vorhanden"
```
