import { helper } from "@ember/component/helper";

export function noop() {
  return () => {};
}

export default helper(noop);
