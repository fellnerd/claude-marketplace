# /vault-backup - DataVault Backup erstellen

Erstellt ein Backup aller DataVault-Daten.

## Verwendung

Erstelle ein vollständiges Backup des DataVaults:

1. Exportiere alle Daten mit `vault_export`
2. Speichere das Backup mit Zeitstempel
3. Zeige eine Zusammenfassung der gesicherten Daten

## Optionen

- `--format json|csv` - Backup-Format (Standard: json)
- `--output <pfad>` - Speicherort für das Backup
- `--quiet` - Keine Ausgabe außer Fehlern

## Beispiele

```
/vault-backup
/vault-backup --format csv --output ./backups/
```

Nach dem Backup wird angezeigt:
- Anzahl der gesicherten Einträge
- Dateigröße
- Speicherort
