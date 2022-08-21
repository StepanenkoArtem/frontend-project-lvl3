import { state } from "../init";
import { STATUS } from "../constants";

export default (e) => {
  state.error = e;
  state.status = STATUS.FAILED;
};
