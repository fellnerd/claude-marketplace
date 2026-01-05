# Claude Code Plugin Marketplace - AI Instructions

Dieses Repository ist ein **Claude Code Plugin Marketplace** nach der offiziellen [Plugin Marketplace Spezifikation](https://code.claude.com/docs/en/plugin-marketplaces).

## Architektur

```
.claude-plugin/marketplace.json    # Marketplace-Katalog (zentral!)
plugins/<plugin-name>/
  ├── .claude-plugin/plugin.json   # Plugin-Manifest
  ├── commands/*.md                # Slash Commands (YAML frontmatter + Markdown)
  ├── agents/*.md                  # AI Agent Definitionen
  └── server/                      # MCP Server (optional)
```

## Kritische Regeln

### Versionierung
- **Versionen MÜSSEN synchron sein**: `marketplace.json` und `plugin.json` müssen identische Versionen haben
- Bei jedem Plugin-Update: Beide Dateien aktualisieren, sonst erkennt Claude Code keine Updates

### Plugin.json Schema
```json
{
  "name": "plugin-name",           // Muss mit Ordner übereinstimmen
  "version": "x.y.z",              // Semver, sync mit marketplace.json!
  "commands": "./commands",        // Pfad muss mit "./" beginnen
  "agents": ["./agents/name.md"],  // Array von Pfaden
  "mcpServers": { ... }            // Optional: HTTP oder stdio
}
```

### Command Markdown Format
Commands in `commands/*.md` folgen diesem Schema:
```markdown
---
description: Kurzbeschreibung für Slash-Command-Menü
tools: [tool-name]                 # MCP Tools die verwendet werden
context:
  - docs/DEVELOPER.md#section      # Kontext-Dateien
---

# Command Titel: {{PLACEHOLDER}}

Workflow-Anweisungen mit Tool-Aufrufen:
\`\`\`
Tool: tool_name
Args: { "param": "{{PLACEHOLDER}}" }
\`\`\`
```

### Agent Markdown Format
Agents in `agents/*.md`:
```markdown
---
name: agent-name
description: Wann dieser Agent aktiviert wird
model: sonnet | haiku | opus
color: orange | blue | green
---

System Prompt und Verhaltensinstruktionen...
```

## Entwickler-Workflow

### Lokales Testen
```bash
# Marketplace lokal hinzufügen
/plugin marketplace add /Users/daniel/source/claude-marketplace

# Plugin installieren
/plugin install datavault@dimetrics-marketplace

# Validieren
/plugin validate .
```

### Nach Änderungen
1. Version in BEIDEN JSON-Dateien erhöhen
2. `git commit && git push`
3. In Claude Code: `/plugin marketplace update dimetrics-marketplace`
4. Dann: `/plugin update datavault`

## DataVault Plugin Spezifika

- **MCP Server**: HTTP-Typ auf `http://10.0.0.25:3001/mcp/v1/messages`
- **25 Commands**: Data Vault 2.0 Workflows (Hub, Satellite, Link, Staging, Mart)
- **2 Agents**: `datavault-haiku-001` (schnell), `datavault-sonnet-001` (komplex)
- **Konvention**: Hash Keys = SHA2_256 → CHAR(64), Separator = '^^'

## Häufige Fehler vermeiden

| Fehler | Lösung |
|--------|--------|
| "source must start with ./" | `"source": "./plugins/datavault"` |
| Plugin-Update nicht erkannt | Versionen in beiden JSON synchronisieren |
| Hooks validation error | `type: "prompt"` braucht `prompt` Feld, nicht `path` |
| Reserved marketplace name | Kein "claude-" Präfix verwenden |
