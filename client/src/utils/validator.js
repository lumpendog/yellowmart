function validator(data, config) {
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof data === 'boolean') {
          statusValidate = !data;
        } else {
          statusValidate = data.trim() === '';
        }
        break;
      }
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case 'isURL': {
        const URLRegExp =
          /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
        statusValidate = data.trim() !== '' && !URLRegExp.test(data);
        break;
      }
      case 'isCapitalSymbol': {
        const capitalRegExp = /[A-Z]+/;
        statusValidate = !capitalRegExp.test(data);
        break;
      }
      case 'isContainDigit': {
        const containDigitRegExp = /\d+/;
        statusValidate = !containDigitRegExp.test(data);
        break;
      }
      case 'min': {
        statusValidate = data.length < config.value;
        break;
      }
      case 'isNumber': {
        const numberRegExp = /^\d+\.?(\d+)?$/;
        statusValidate = !numberRegExp.test(data);
        break;
      }
      case 'isInteger': {
        const integerRegExp = /^\d+$/;
        statusValidate = !integerRegExp.test(data);
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }

  return errors;
}

export default validator;
