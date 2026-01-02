# /vault-init - DataVault initialisieren

Initialisiert einen neuen DataVault im aktuellen Projekt oder Verzeichnis.

## Was passiert

1. Erstellt einen `.datavault` Ordner im aktuellen Verzeichnis
2. Initialisiert eine leere `vault.json` Datei
3. Erstellt eine `.gitignore` Datei um sensible Daten zu schützen

## Optionen

- `--global` - Initialisiert einen globalen Vault im Home-Verzeichnis
- `--name <name>` - Gibt dem Vault einen benutzerdefinierten Namen

## Beispiel

```
/vault-init
/vault-init --global
/vault-init --name projekt-secrets
```
