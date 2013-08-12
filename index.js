var levelup = require('levelup');

function LevelStore (options) {
  this.options = options || { };
  this.name    = options.name || 'LevelStore';

  this.db = levelup(this.name);
}

LevelStore.prototype.add = function (geojson, dfd) {
  if (geojson.type === "FeatureCollection"){
    for (var i = 0; i < geojson.features.length; i++) {
      this.db.put(geojson.features[i].id, JSON.stringify(geojson.features[i]), function (err) {
        if (err) {
          dfd.reject(err);
        }
      });
    }
  } else {
    this.db.put(geojson.id, JSON.stringify(geojson), function (err) {
      if (err) {
        dfd.reject(err);
      }
    });
  }

  dfd.resolve(geojson);
  return dfd;
};

LevelStore.prototype.get = function (id, dfd) {
  this.db.get(id, function (err, data) {
    if (err) {
      dfd.reject(err);
    } else {
      dfd.resolve(JSON.parse(data));
    }
  });

  return dfd;
};

LevelStore.prototype.update = function (geojson, dfd) {
  return this.add(JSON.stringify(geojson), dfd);
};

LevelStore.prototype.remove = function (id, dfd) {
  if (geojson.type === "FeatureCollection"){
    for (var i = 0; i < geojson.features.length; i++) {
      this.db.del(geojson.features[i].id, function (err) {
        if (err) {
          dfd.reject(err);
        }
      });
    }
  } else {
    this.db.del(geojson.id, function (err) {
      if (err) {
        dfd.reject(err);
      }
    });
  }

  dfd.resolve(geojson);
  return dfd;

};

exports.LevelStore = LevelStore;