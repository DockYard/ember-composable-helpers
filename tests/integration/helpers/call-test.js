import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | call', function (hooks) {
    setupRenderingTest(hooks);

    test('it renders a function return value with curried arguments', async function (assert) {
        this.fn = function (value) {
            return value.toUpperCase();
        };

        await render(hbs`{{call (fn this.fn "foo")}}`);

        assert.dom(this.element).hasText('FOO');
    });

    test('it calls a function with this binding', async function (assert) {
        this.that = {
            value: 'foo',
        };

        this.fn = function () {
            return this.value.toUpperCase();
        };

        await render(hbs`{{call this.fn this.that}}`);

        assert.dom(this.element).hasText('FOO');
    });
});

