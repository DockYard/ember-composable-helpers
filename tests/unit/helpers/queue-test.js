import { reject, resolve } from 'rsvp';
import { queue } from 'dummy/helpers/queue';
import { module, test } from 'qunit';
import sinon from 'sinon';

let sandbox;

let step0;
let step1;
let step2;
let step3;
let fail;

module('Unit | Helper | queue', function(hooks) {
  hooks.beforeEach(function() {
    sandbox = sinon.sandbox.create();
    step0 = sinon.spy(() => resolve());
    step1 = sinon.spy((x) => x);
    step2 = sinon.spy((x, y) => y);
    step3 = sinon.spy(() => null);
    fail  = sinon.spy(() => reject());
  });

  hooks.afterEach(function() {
    sandbox.restore();
    step1.reset();
    step2.reset();
    step3.reset();
  });

  test('it passes all functions the same arguments', function(assert) {
    let queued = queue([step1, step2, step3]);
    queued(2, 4);

    assert.ok(step1.calledWith(2, 4), 'step1 called with correct args');
    assert.ok(step2.calledWith(2, 4), 'step2 called with correct args');
    assert.ok(step3.calledWith(2, 4), 'step3 called with correct args');
  });

  test('it is promise aware', function(assert) {
    let done = assert.async();
    let queued = queue([step0, step1, step2, step3]);
    let result = queued(2, 4);

    result.then((resolved) => {
      assert.equal(resolved, null, 'it is promise aware');
      done();
    });
  });

  test('it aborts the chain if a promise in the queue rejects', function(assert) {
    let done = assert.async();
    let queued = queue([step0, fail, step1]);

    queued(2, 4)
      .catch(function() {})
      .finally(() => {
        assert.equal(step1.callCount, 0, 'should abort the chain');
        done();
      });
  });
});
