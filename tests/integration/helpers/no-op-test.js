import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, click } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Helper | {{no-op}}", function(hooks) {
  setupRenderingTest(hooks);

  test("It successfully renders and does nothing when clicked", async function(assert) {
    assert.expect(0);
    await render(hbs`<button onclick={{action (no-op)}}></button> `);
    await click("button");
  });
});
