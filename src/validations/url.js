import * as Yup from "yup";
import { ERRORS } from "../constants";

const urlFormSchema = Yup.object().shape({
  url: Yup.string().trim().url(),
});

export default (url) =>
  urlFormSchema.validate(url).catch((e) => {
    throw new Error(ERRORS.INVALID_URL);
  });
