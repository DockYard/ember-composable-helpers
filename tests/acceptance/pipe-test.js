import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | pipe');

test('it pipes actions', function(assert) {
  visit('/pipe');

  andThen(() => assert.equal(currentURL(), '/pipe', 'correct url'));
  andThen(() => click('#pipe-button'));
  andThen(() => {
    assert.ok(find('pre:contains("Value: 6")').length, 'it returns the right value');
  });
});
