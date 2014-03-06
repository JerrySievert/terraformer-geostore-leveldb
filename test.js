var LevelStore = require('./');
var test = require("tape");
var leveldown = require('leveldown');
var point = { type: "Point", coordinates: [ -122, 45 ], id: "point" };
var featureCollection = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "id": "foo",
    "properties": {
      "foo": "bar"
    },
    "geometry":  {
      "type": "Polygon",
      "coordinates": [
        [ [41.83,71.01],[56.95,33.75],[21.79,36.56],[41.83,71.01] ]
      ]
    }
  },
  {
    "type": "Feature",
    "id": "bar",
    "properties": {
      "foo": "bar"
    },
    "geometry":  {
      "type": "Polygon",
      "coordinates": [
        [ [41.83,71.01],[56.95,33.75],[21.79,36.56],[41.83,71.01] ]
      ]
    }
  }],
  "properties": {
    "bar": "baz"
  }
};

function cleanup (t, store) {
  store.close(function () {
    leveldown.destroy(store.name, function (err) {
      t.error(err, 'no error cleaning up');
      t.end();
    });
  });
}

test("should correctly add geojson as a point", function (t) {
  var store = new LevelStore();

  store.add(point, function (err) {
    t.error(err, 'no error adding');
    store.get('point', function (err, resp) {
      t.error(err, 'no error getting');
      t.deepEqual(resp, point, 'add points are equal');
      cleanup(t, store);
    });
  });
});

test("should correctly update geojson as a point", function (t) {
  var store = new LevelStore();

  store.update(point, function (err) {
    t.error(err, 'no error updating');
    store.get('point', function (err, resp) {
      t.error(err, 'no error getting');
      t.deepEqual(resp, point, 'points are equal');
      cleanup(t, store);
    });
  });
});

test("should correctly add geojson as a feature collection", function (t) {
   var store = new LevelStore();

  store.add(featureCollection, function (err) {
    t.error(err, 'no error adding');
    store.get('foo', function (err, resp) {
      t.error(err, 'no error getting');
      t.deepEqual(resp, featureCollection.features[0], 'feature collection points are equal');
      cleanup(t, store);
    });
  });
});
test("should correctly remove a feature", function (t) {
   var store = new LevelStore();

  store.add(featureCollection, function (err) {
    t.error(err, 'no error adding');
    store.get('foo', function (err, resp) {
      t.error(err, 'no error getting foo');
      store.remove('foo', function (err) {
        t.error(err, 'no error removing');
        store.get('foo', function (err) {
          t.ok(err, 'foo is no longer there');
          cleanup(t, store);
        });
      });

    });
  });
});
test("should correctly remove features batch", function (t) {
   var store = new LevelStore();

  store.add(featureCollection, function (err) {
    t.error(err, 'no error adding');
    store.get('foo', function (err, resp) {
      t.error(err, 'no error getting foo');
      store.get('bar', function (err, resp) {
        t.error(err, 'no error getting bar');
        store.remove(['foo', 'bar'], function (err) {
          t.error(err, 'no error removing');
          store.get('foo', function (err) {
            t.ok(err, 'foo is no longer there');
            store.get('bar', function (err) {
              t.ok(err, 'bar is no longer there');
              cleanup(t, store);
            });
          });
        });
      });
    });
  });
});