# Roberto!

A personal, experimental fork of [Bob Wallet](https://github.com/kyokan/bob-wallet)

![Roberto!](https://raw.githubusercontent.com/pinheadmz/bob-wallet/roberto1/resources/roberto.png)

## Major differences:

- Original wallet-as-plugin architecture
- Pink border around UI to identify in screenshots for support
- Allow custom port configuration from environment for better testing:

Example:

```
$ export HSD_NETWORK=regtest
$ export HSD_PORT=10001
$ export HSD_BRONTIDE_PORT=10002
$ export HSD_HTTP_PORT=10003
$ export HSD_WALLET_HTTP_PORT=10004
$ export HSD_RS_PORT=10005
$ export HSD_NS_PORT=10006
```

Configure Electron debugger:

```
$ export PORT=2121
```

Configure custom data directory:

```
$ export ROBERTO_PREFIX=~/Desktop/roberto_test_1
```

Run Roberto! and connect to another regtest instance with default configuration:

```
$ npm run dev
$ hsd-rpc --api-key=<API KEY> --http-port=10003 --network=regtest addnode 127.0.0.1 add
```

Ensure connection by generating a block on one node (other node should sync):

```
$ hsd-rpc \
  --api-key=<API KEY> \
  --http-port=10003 \
  --network=regtest \
  generatetoaddress 1 rs1q20v9pj98qt7w2zd2xk80v00wala0xjnj8tg0dt
```
