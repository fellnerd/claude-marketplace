---
description: Docker Status, Container und Cleanup
---

# Docker Verwaltung

Verwalte Docker Container, Images und Ressourcen.

## Status prüfen

```bash
# Docker läuft?
docker info > /dev/null 2>&1 && echo "✅ Docker läuft" || echo "❌ Docker nicht gestartet"

# Version
docker --version
```

## Laufende Container

```bash
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

## Alle Container (inkl. gestoppte)

```bash
docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Image}}"
```

## Ressourcen-Verbrauch

```bash
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

## Images auflisten

```bash
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
```

## Speicherverbrauch

```bash
docker system df
```

## Cleanup

⚠️ **Frage IMMER vor dem Cleanup um Bestätigung!**

```bash
# Gestoppte Container entfernen
docker container prune -f

# Unbenutzte Images entfernen
docker image prune -f

# Alles Unbenutzte entfernen (aggressiv)
docker system prune -af --volumes
```

## Container Logs: {{CONTAINER}}

```bash
docker logs --tail 50 {{CONTAINER}}
```

## In Container einsteigen: {{CONTAINER}}

```bash
docker exec -it {{CONTAINER}} /bin/sh
```
