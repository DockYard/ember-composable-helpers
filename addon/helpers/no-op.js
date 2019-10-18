import { helper } from "@ember/component/helper";

export function noOp() {
  return () => {};
}

export default helper(noOp);
