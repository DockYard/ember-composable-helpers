import Ember from 'ember';
import { queue } from 'dummy/helpers/queue';
import { module, test } from 'qunit';
import sinon from 'sinon';

const {
  RSVP: { resolve, reject }
} = Ember;
let sandbox;

const step0 = sinon.spy(() => resolve());
const step1 = sinon.spy((x) => x);
const step2 = sinon.spy((x, y) => y);
const step3 = sinon.spy(() => null);
const fail  = sinon.spy(() => reject());

module('Unit | Helper | queue', {
  beforeEach() {
    sandbox = sinon.sandbox.create();
  },

  afterEach() {
    sandbox.restore();
    step1.reset();
    step2.reset();
    step3.reset();
  }
});

test('it queues functions', function(assert) {
  let queued = queue([step1, step2, step3]);
  queued(2, 4);

  assert.ok(step1.calledOnce, 'step1 called once');
  assert.ok(step2.calledOnce, 'step2 called once');
  assert.ok(step3.calledOnce, 'step3 called once');
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
