import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | compose');

test('it composes actions', function(assert) {
  visit('/compose');

  andThen(() => assert.equal(currentURL(), '/compose', 'correct url'));
  andThen(() => click('#compose-button'));
  andThen(() => {
    assert.ok(find('pre:contains("Value: 36")').length, 'it returns the right value');
  });
});
