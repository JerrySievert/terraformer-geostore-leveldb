# LevelDB GeoStore for Terraformer

This is an experimental LevelDB plugin got Terraformer's GeoStore.  Currently, it works in Node.js only.

## Install

```bash
npm install --save terraformer-geostore-leveldb leveldown
```

Note that it does not come bundled with leveldown by default, you need to install that too.

## Usage

```js
var LevelStore = require('terraformer-geostore-leveldb');

var store = new GeoStore({
  store: new LevelStore("buildings"),
  index: RTree()
});
```