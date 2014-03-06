var level = require('levelup');
module.exports = LevelStore;
function LevelStore (options, cb) {
  if (typeof options === 'string') {
    options = {
      name: options
    };
  }
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  options = options || {};
  this.options = options;
  this.name    = options.name || 'LevelStore';
  if (options.defaultCallback) {
    this.defaultCallback = options.defaultCallback;
  }
  cb = cb || this.defaultCallback;
  var levelOpts ={};
  Object.keys(options).forEach(function(key) {
    levelOpts[key] = options[key];
  });
  levelOpts.valueEncoding = 'json';
  this.db = level(this.name, levelOpts, cb);
  this.close = this.db.close.bind(this.db);
}

LevelStore.prototype.add = function (geojson, callback) {
  callback = callback || this.defaultCallback;
  if (geojson.type === "FeatureCollection") {
    this.db.batch(geojson.features.map(function (feature) {
      return {
        type: 'put',
        key: feature.id,
        value: feature
      };
    }), callback);
  } else {
    this.db.put(geojson.id, geojson, callback);
  }
};

LevelStore.prototype.get = function (id, callback) {
  this.db.get(id, callback);
};

LevelStore.prototype.update = function (geojson, callback) {
  this.add(geojson, callback);
};

LevelStore.prototype.remove = function (id, callback) {
  callback = callback || this.defaultCallback;
  if (Array.isArray(id)){
    this.db.batch(id.map(function (id) {
      return {
        type: 'del',
        key: id
      };
    }), callback);
  } else {
    this.db.del(id, callback);
  }
};

LevelStore.prototype.defaultCallback = function (err) {
  if (err) {
    throw err;
  }
};