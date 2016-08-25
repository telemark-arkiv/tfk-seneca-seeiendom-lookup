# tfk-seneca-seeiendom-lookup
Looks up Seeiendom data

## Messages handled
### ```role: seeiendom, cmd: lookup```
Looks up address. Filters hits with FYLKESNR === '08'
```javascript
Seneca.act('role: seeiendom, cmd: lookup', {'address': 'Fylkesbakken 10, 3715 Skien'}, email, (error, data) => {})
```

From cli

```curl -d '{"role": "seeiendom", "cmd":"lookup", "address": "Fylkesbakken 10, 3715 Skien"}' -v http://localhost:8000/act```

## Messages emitted
This service emits no messages
