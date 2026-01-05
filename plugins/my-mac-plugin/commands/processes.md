---
description: Zeigt Top-Prozesse nach CPU- oder RAM-Verbrauch
---

# Prozesse anzeigen

Zeigt die ressourcenhungrigsten Prozesse auf dem Mac.

## Top CPU-Verbraucher

```bash
ps aux | sort -nrk 3,3 | head -11 | awk 'NR==1{print "USER\tCPU%\tMEM%\tPID\tCOMMAND"} NR>1{print $1"\t"$3"\t"$4"\t"$2"\t"$11}'
```

## Top RAM-Verbraucher

```bash
ps aux | sort -nrk 4,4 | head -11 | awk 'NR==1{print "USER\tMEM%\tCPU%\tPID\tCOMMAND"} NR>1{print $1"\t"$4"\t"$3"\t"$2"\t"$11}'
```

## Prozess suchen: {{PROCESS_NAME}}

```bash
pgrep -fl "{{PROCESS_NAME}}"
```

## Zombie-Prozesse finden

```bash
ps aux | awk '$8 ~ /Z/ {print $2, $11}'
```

## Prozess beenden: {{PID}}

⚠️ **Frage IMMER vor dem Beenden um Bestätigung!**

```bash
# Sanft beenden (SIGTERM)
kill {{PID}}

# Erzwungen beenden (SIGKILL) - nur wenn nötig
kill -9 {{PID}}
```
