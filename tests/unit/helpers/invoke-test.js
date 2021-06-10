import { A } from '@ember/array';
import { resolve } from 'rsvp';
import { invoke } from 'dummy/helpers/invoke';
import { module, test } from 'qunit';

module('Unit | Helper | invoke', function() {
  test('it calls method inside objects', function(assert) {
    let object = {
      callMom() {
        return `calling mom in ${[...arguments]}`;
      }
    };
    let action = invoke(['callMom', 1, 2, 3, object]);

    assert.equal(action(), 'calling mom in 1,2,3', 'it calls functions');
  });

  test('it cares about method arguments', function(assert) {
    let object = {
      callContact(name, number) {
        return `calling ${name} with ${number}`;
      }
    };
    let action = invoke(['callContact', 'mom', '1234567', object]);

    assert.equal(action(), 'calling mom with 1234567', 'it cares about function args');
  });

  test('it is promise aware', function(assert) {
    let done = assert.async();
    let object = {
      func() {
        return resolve([1, 2, 3]);
      }
    };

    let action = invoke(['func', object]);
    let result = action();

    result.then((resolved) => {
      assert.deepEqual([1, 2, 3], resolved, 'it is promise aware');
      done();
    });
  });

  test('it wraps array of promises in another promise', function(assert) {
    let done = assert.async();
    let array = A();

    array.pushObject({
      func() {
        return resolve(1);
      }
    });
    array.pushObject({
      func() {
        return resolve(2);
      }
    });
    array.pushObject({
      func() {
        return resolve(3);
      }
    });

    let action = invoke(['func', array]);
    let result = action();

    result.then((resolved) => {
      assert.deepEqual([1, 2, 3], resolved, 'it is promise aware');
      done();
    });
  });
});
