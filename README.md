# LevelDB GeoStore for Terraformer

This is an experimental LevelDB plugin got Terraformer's GeoStore.  Currently, it works in Node.js only.

## Usage

    var LevelStore = require('terraformer-geostore-leveldb').LevelStore;

    var store = new GeoStore({
      store: new LevelStore({name: "buildings"}),
      index: RTree()
    });
