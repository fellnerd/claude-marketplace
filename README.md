# Dimetrics Claude Code Plugin Marketplace

Ein Plugin Marketplace für Claude Code mit nützlichen Tools und Erweiterungen.

## 🚀 Installation

### Marketplace hinzufügen

**Via GitHub:**
```bash
/plugin marketplace add dimetrics/claude-marketplace
```

**Via Git URL:**
```bash
/plugin marketplace add https://github.com/dimetrics/claude-marketplace.git
```

**Lokal (für Entwicklung):**
```bash
/plugin marketplace add /Users/daniel/source/claude-marketplace
```

## 📦 Verfügbare Plugins

### DataVault

Sicherer Datenspeicher für strukturierte Daten mit MCP-Server-Integration.

**Installieren:**
```bash
/plugin install datavault@dimetrics-marketplace
```

**Features:**
- 🔐 Sichere Datenspeicherung via MCP
- 🤖 Spezialisierte AI Agents
- 📝 Slash Commands für schnellen Zugriff
- 🏷️ Tag-basierte Organisation

**Enthaltene Komponenten:**
| Typ | Name | Beschreibung |
|-----|------|--------------|
| Command | `/vault` | Vault-Operationen |
| Command | `/vault-init` | Vault initialisieren |
| Command | `/vault-backup` | Backup erstellen |
| Agent | `datavault-haiku-001` | Schneller Daten-Assistent |
| Agent | `datavault-sonnet-001` | Erweiterter Daten-Assistent |
| MCP Server | `datavault-mcp` | HTTP MCP Server |

## 🏗️ Struktur

```
.
├── .claude-plugin/
│   └── marketplace.json    # Marketplace-Katalog
├── plugins/
│   └── datavault/
│       ├── .claude-plugin/
│       │   └── plugin.json # Plugin-Manifest
│       ├── agents/         # AI Agents
│       └── commands/       # Slash Commands
├── LICENSE
└── README.md
```

## 🔧 Für Teams

Füge den Marketplace zu deinem Projekt hinzu in `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "dimetrics-marketplace": {
      "source": {
        "source": "github",
        "repo": "dimetrics/claude-marketplace"
      }
    }
  },
  "enabledPlugins": {
    "datavault@dimetrics-marketplace": true
  }
}
```

## 🛠️ Entwicklung

### Marketplace validieren
```bash
/plugin validate .
```

### Lokal testen
```bash
/plugin marketplace add ./
/plugin install datavault@dimetrics-marketplace
```

### Neues Plugin hinzufügen

1. Erstelle einen Ordner unter `plugins/`
2. Füge `.claude-plugin/plugin.json` hinzu
3. Füge Befehle unter `commands/` hinzu
4. Optional: Agents unter `agents/`
5. Optional: MCP Server konfigurieren
6. Registriere das Plugin in `.claude-plugin/marketplace.json`

## 📜 Lizenz

MIT © Daniel Fellner
