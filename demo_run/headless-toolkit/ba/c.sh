#!/usr/bin/env bash
# Send one JSON command to the daemon and print its result.
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
rm -f $D/out.json; printf '%s\n' "$1" > $D/cmd.json
for i in $(seq 1 900); do [ -f $D/out.json ] && break; sleep 1; done
cat $D/out.json; echo
