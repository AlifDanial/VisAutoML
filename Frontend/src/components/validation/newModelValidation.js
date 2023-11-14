import validator from "validator";

export const modelValidator = ({ name, type }) => {
  let isValid = true;
  let validationErrors = {};

  if (validator.isEmpty(name)) {
    isValid = false;
    validationErrors = { ...validationErrors, name: "Please provide a name" };
  }
  if (validator.isEmpty(type)) {
    isValid = false;
    validationErrors = { ...validationErrors, type: "Please choose a type" };
  }
  return { isValid, validationErrors };
};
