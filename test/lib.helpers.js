var test = require('tape');
var helpers = require('../lib/helpers.js');

test('helpers.getFieldByPath', function(t) {
  "use strict";

  var complexObj = {
    name: {
      first: 'Big',
      last: 'Guy',
    },
    location: {
      address: '405 No Where Street',
      city: 'Bigatory',
      state: {
        full: 'Washington',
        abbreviation: 'WA',
      },
      zip: '43981',
    },
    status: {
      age: 10,
      children: 0,
      married: false,
      single: true,
      spouse: null,
    },
  };

  t.doesNotThrow(helpers.getFieldByPath, 'does not throw without arguments');
  t.doesNotThrow(function() { return helpers.getFieldByPath(null, 'foo'); }, 'does not throw without an object');
  t.doesNotThrow(function() { return helpers.getFieldByPath(complexObj); }, 'does not throw without a path');

  t.deepEqual(helpers.getFieldByPath(complexObj), complexObj, 'no path returns the original object');
  t.deepEqual(helpers.getFieldByPath(complexObj, ''), complexObj, 'empty path returns the original object');

  t.equal(helpers.getFieldByPath(complexObj, 'invalid'), null, 'invalid path returns null');
  t.equal(helpers.getFieldByPath(complexObj, 'foo.bar'), null, 'invalid long path returns null');

  t.deepEqual(helpers.getFieldByPath(complexObj, 'name'), {first: 'Big', last: 'Guy'}, 'valid path short returns the inner object');
  t.equal(helpers.getFieldByPath(complexObj, 'name.first'), 'Big', 'valid long path returns the string value');
  t.equal(helpers.getFieldByPath(complexObj, 'location.state.full'), 'Washington', 'valid long path returns the string value');

  t.equal(helpers.getFieldByPath(complexObj, 'name.last.toString'), null, 'returns null if path is not an object');
  t.equal(helpers.getFieldByPath(complexObj, 'status.age.toString'), null, 'returns null if path is not an object');
  t.equal(helpers.getFieldByPath(complexObj, 'status.married.toString'), null, 'returns null if path is not an object');
  t.equal(helpers.getFieldByPath(complexObj, 'status.single.toString'), null, 'returns null if path is not an object');

  t.equal(helpers.getFieldByPath(complexObj, 'status.age'), 10, 'able to return a number');
  t.equal(helpers.getFieldByPath(complexObj, 'status.children'), 0, 'able to return a falsy number');
  t.equal(helpers.getFieldByPath(complexObj, 'status.married'), false, 'able to return false');
  t.equal(helpers.getFieldByPath(complexObj, 'status.single'), true, 'able to return true');
  t.equal(helpers.getFieldByPath(complexObj, 'status.spouse'), null, 'able to return null');

  t.end();
});