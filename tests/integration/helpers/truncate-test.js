import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dasherize', 'Integration | Helper | {{truncate}}', {
  integration: true
});

test('It truncates to 140 characters if no characterLimit is provided', function(assert) {
  this.render(hbs`{{truncate "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit quam enim, in suscipit est rutrum id. Etiam vitae blandit purus, sed semper sem."}}`);

  let expected = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit quam enim, in suscipit est rutrum id. Etiam vitae blandit purus,...';

  assert.equal(this.$().text().trim(), expected, 'truncates to 140 characters');
});

test('It truncates to characterLimit provided', function(assert) {
  this.render(hbs`{{truncate "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit quam enim, in suscipit est rutrum id. Etiam vitae blandit purus, sed semper sem." 20}}`);

  let expected = 'Lorem ipsum dolor si...';

  assert.equal(this.$().text().trim(), expected, 'truncates to characterLimit');
});

test('It does not truncate if string is not longer than characterLimit', function(assert) {
  this.render(hbs`{{truncate "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit quam enim, in suscipit est rutrum id." 140}}`);

  let expected = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit quam enim, in suscipit est rutrum id.';

  assert.equal(this.$().text().trim(), expected, 'does not truncate');
});
