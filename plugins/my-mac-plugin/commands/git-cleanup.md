---
description: Git-Repositories aufräumen und optimieren
---

# Git Cleanup

Räumt Git-Repositories auf und gibt Speicherplatz frei.

## Aktuelles Repository analysieren

```bash
# Repo-Größe
du -sh .git

# Anzahl Commits
git rev-list --count HEAD

# Branches
git branch -a | wc -l
```

## Lokale Branches aufräumen

```bash
# Gemergete Branches anzeigen (außer main/master)
git branch --merged | grep -v -E "(main|master|\*)"

# Gemergete Branches löschen
git branch --merged | grep -v -E "(main|master|\*)" | xargs -n 1 git branch -d
```

## Remote-Tracking Branches aufräumen

```bash
# Veraltete Remote-Referenzen entfernen
git fetch --prune

# Remote Branches die nicht mehr existieren
git branch -vv | grep ': gone]' | awk '{print $1}'
```

## Git Garbage Collection

```bash
# Standard GC
git gc

# Aggressiv (langsamer, aber gründlicher)
git gc --aggressive --prune=now
```

## Große Dateien im Repo finden

```bash
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  sed -n 's/^blob //p' | \
  sort -rnk2 | \
  head -10 | \
  awk '{printf "%.2f MB\t%s\n", $2/1048576, $3}'
```

## Alle Repos im Ordner aktualisieren

```bash
# Alle Git-Repos im aktuellen Verzeichnis pullen
find . -maxdepth 2 -name .git -type d | while read dir; do
  repo=$(dirname "$dir")
  echo "📦 $repo"
  git -C "$repo" pull --rebase 2>/dev/null || echo "  ⚠️ Fehler"
done
```
