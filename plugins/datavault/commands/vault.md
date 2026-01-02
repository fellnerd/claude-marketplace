# /vault - DataVault Verwaltung

Verwalte den DataVault Datenspeicher.

## Verwendung

- `/vault store <key> <value>` - Speichert einen Wert unter einem Schlüssel
- `/vault get <key>` - Ruft einen Wert ab
- `/vault list` - Listet alle gespeicherten Schlüssel auf
- `/vault delete <key>` - Löscht einen Eintrag
- `/vault search <query>` - Durchsucht die Einträge
- `/vault export` - Exportiert alle Daten als JSON
- `/vault stats` - Zeigt Statistiken zum Vault

## Beispiele

```
/vault store api-key sk-12345
/vault get api-key
/vault list
/vault search api
```

Nutze den DataVault MCP-Server für programmatischen Zugriff auf die Daten.
