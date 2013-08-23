var levelup = require('levelup');

function LevelStore (options) {
  this.options = options || { };
  this.name    = options.name || 'LevelStore';

  this.db = levelup(this.name);
}

LevelStore.prototype.add = function (geojson, callback) {
  if (geojson.type === "FeatureCollection"){
    var done = false, count = 0;
    for (var i = 0; i < geojson.features.length && !done; i++) {
      this.db.put(geojson.features[i].id, JSON.stringify(geojson.features[i]), function (err) {
        count++;

        if (err) {
          done = true;
          if (callback) {
            callback(err);
          }
        } else {
          if (count === geojson.features.length) {
            if (callback) {
              callback(null);
            }            
          }
        }
      });
    }

    if (done) {
      return;
    }
  } else {
    this.db.put(geojson.id, JSON.stringify(geojson), function (err) {
      if (err) {
        if (callback) {
          callback(err);
          return;
        }
      } else {
        if (callback) {
          callback(null);
        }
      }
    });
  }
};

LevelStore.prototype.get = function (id, callback) {
  this.db.get(id, function (err, data) {
    if (err) {
      if (callback) {
        callback(err, data);
      }
    } else {
      if (callback) {
        callback(null, JSON.parse(data));
      }
    }
  });
};

LevelStore.prototype.update = function (geojson, callback) {
  this.add(geojson, callback);
};

LevelStore.prototype.remove = function (id, callback) {
  if (geojson.type === "FeatureCollection") {
    var done = false, count = 0;
    for (var i = 0; i < geojson.features.length && !done; i++) {
      this.db.del(geojson.features[i].id, function (err) {
        count++;

        if (err) {
          done = true;
          if (callback) {
            callback(err);
          }
        } else {
          if (count === geojson.features.length) {
            if (callback) {
              callback(null);
            }            
          }
        }
      });
    }
  } else {
    this.db.del(geojson.id, function (err) {
      if (err) {
        if (callback) {
          callback(err);
        }
      } else {
        if (callback) {
          callback(null, geojson.id);
        }
      }
    });
  }
};

exports.LevelStore = LevelStore;