---
description: Zeigt belegte Ports und zugehörige Prozesse
---

# Port-Übersicht

Zeigt welche Ports belegt sind und von welchen Prozessen.

## Alle lauschenden Ports anzeigen

```bash
lsof -iTCP -sTCP:LISTEN -P -n | awk 'NR==1 || NR>1 {print $1, $2, $9}' | column -t
```

## Spezifischen Port prüfen: {{PORT}}

```bash
lsof -i :{{PORT}} -P -n
```

## Häufige Entwickler-Ports

| Port | Typische Verwendung |
|------|---------------------|
| 3000 | React/Next.js Dev Server |
| 3001 | Alternative Dev Server |
| 5000 | Flask/Python |
| 5173 | Vite Dev Server |
| 8000 | Django/FastAPI |
| 8080 | Alternative HTTP |
| 5432 | PostgreSQL |
| 3306 | MySQL |
| 6379 | Redis |
| 27017 | MongoDB |

## Prozess auf Port beenden: {{PORT}}

⚠️ **Frage IMMER vor dem Beenden um Bestätigung!**

```bash
# PID finden
lsof -ti :{{PORT}}

# Prozess beenden (nach Bestätigung)
kill -9 $(lsof -ti :{{PORT}})
```
