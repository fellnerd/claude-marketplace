---
description: Zeigt macOS System-Informationen an
---

# System-Informationen abrufen

Sammle und zeige relevante macOS System-Informationen.

## Ausführung

Führe folgende Befehle aus und präsentiere die Ergebnisse übersichtlich:

```bash
# macOS Version
sw_vers

# Hardware Info
system_profiler SPHardwareDataType | head -20

# Speicherplatz
df -h / | tail -1

# RAM Nutzung
vm_stat | head -5

# CPU Last
top -l 1 | head -10
```

## Ausgabeformat

Präsentiere die Ergebnisse in einer übersichtlichen Tabelle:

| Kategorie | Wert |
|-----------|------|
| macOS Version | ... |
| Chip | ... |
| RAM | ... |
| Freier Speicher | ... |
