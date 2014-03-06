# LevelDB GeoStore for Terraformer

This is an experimental LevelDB plugin got Terraformer's GeoStore.  Currently, it works in Node.js only.

## Usage

```js
var LevelStore = require('terraformer-geostore-leveldb');

var store = new GeoStore({
  store: new LevelStore("buildings"),
  index: RTree()
});
```