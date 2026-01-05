---
description: Zeigt WLAN-Status und Netzwerk-Diagnose
---

# WLAN & Netzwerk

Netzwerk-Informationen und Diagnose-Tools.

## Aktueller WLAN-Status

```bash
# WLAN Interface Info
/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I
```

## IP-Adressen

```bash
# Lokale IP
ipconfig getifaddr en0

# Öffentliche IP
curl -s ifconfig.me

# Alle Interfaces
ifconfig | grep "inet " | awk '{print $2}'
```

## DNS-Informationen

```bash
# Aktuelle DNS-Server
scutil --dns | grep "nameserver" | head -5

# DNS für Domain testen
nslookup {{DOMAIN}}
```

## Verbindung testen

```bash
# Ping
ping -c 4 {{HOST}}

# Traceroute
traceroute {{HOST}}

# Port-Erreichbarkeit
nc -zv {{HOST}} {{PORT}}
```

## WLAN-Netzwerke scannen

```bash
/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -s
```

## DNS-Cache leeren

```bash
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
echo "DNS Cache geleert"
```
