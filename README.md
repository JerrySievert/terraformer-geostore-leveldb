# LevelDB GeoStore for Terraformer

This is an experimental LevelDB plugin got Terraformer's GeoStore. Should work in the browser with browserify (thanks @calvinmetcalf).

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

## Developing

run tests with `npm test`, it will run the node and browser tests.
