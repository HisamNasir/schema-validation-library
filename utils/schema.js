import * as yup from "yup";
import validator from "validator";
import _ from "lodash";
const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  age: yup.number().positive().integer().required(),
});
const customValidator = async (data) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return true; //suces validation
  } catch (err) {
    const errors = {};
    err.inner.forEach((error) => {
      errors[error.path] = error.message;
    });
    return errors; //validate error return
  }
};
const customValidatorSync = (data) => {
  const errors = {};
  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email format";
  }
  if (!_.isString(data.name) || _.isEmpty(_.trim(data.name))) {
    errors.name = "Name is required";
  }
  if (!validator.isInt(data.age.toString())) {
    errors.age = "Age must be an integer";
  }
  return errors;
};
export { customValidator, customValidatorSync };
