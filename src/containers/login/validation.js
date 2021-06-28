const validation = (values) => {
  let errors = {};

  if (!values.username) {
    errors.username = "User Name is Required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
};

export default validation;
