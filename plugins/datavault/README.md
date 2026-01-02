# DataVault Plugin

Sicherer lokaler Datenspeicher für strukturierte Daten mit JSON-basierter Persistenz.

## Installation

```bash
/plugin install datavault@daniel-marketplace
```

## Features

- **Schlüssel-Wert-Speicherung**: Speichere beliebige Daten unter eindeutigen Schlüsseln
- **Tag-System**: Kategorisiere Einträge mit Tags für bessere Organisation
- **Volltextsuche**: Durchsuche Schlüssel, Werte und Tags
- **Export**: Exportiere alle Daten als JSON oder CSV
- **MCP Integration**: Nutze den DataVault über MCP-Tools

## Befehle

### /vault

Hauptbefehl für alle Vault-Operationen:

```bash
/vault store mykey "mein wert"        # Wert speichern
/vault get mykey                       # Wert abrufen
/vault list                            # Alle Schlüssel auflisten
/vault delete mykey                    # Eintrag löschen
/vault search "suchbegriff"           # Durchsuchen
/vault export                          # Als JSON exportieren
/vault stats                           # Statistiken anzeigen
```

### /vault-init

Initialisiert einen neuen DataVault:

```bash
/vault-init                           # Lokaler Vault
/vault-init --global                  # Globaler Vault im Home-Verzeichnis
```

## MCP Tools

Der DataVault stellt folgende MCP-Tools bereit:

| Tool | Beschreibung |
|------|-------------|
| `vault_store` | Speichert einen Wert unter einem Schlüssel |
| `vault_get` | Ruft einen Wert ab |
| `vault_delete` | Löscht einen Eintrag |
| `vault_list` | Listet alle Schlüssel auf |
| `vault_search` | Durchsucht den Vault |
| `vault_stats` | Zeigt Statistiken |
| `vault_export` | Exportiert alle Daten |

## Speicherort

Standardmäßig werden die Daten in `~/.datavault/vault.json` gespeichert.

Du kannst den Speicherort über die Umgebungsvariable `DATAVAULT_DIR` ändern:

```bash
export DATAVAULT_DIR=/pfad/zum/vault
```

## Beispiele

### API-Schlüssel speichern

```bash
/vault store github-token ghp_xxxxxxxxxxxx
/vault store openai-key sk-xxxxxxxxxxxx
```

### Projektnotizen

```bash
/vault store projekt:website:todo "Header fertigstellen"
/vault store projekt:website:status "in arbeit"
```

### Mit Tags organisieren

Über MCP können Tags hinzugefügt werden:

```javascript
// vault_store aufrufen mit:
{
  "key": "db-connection",
  "value": "postgres://...",
  "tags": ["database", "production"]
}
```
