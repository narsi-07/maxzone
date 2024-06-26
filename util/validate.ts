export const emailValidate = (values: string) => {
  let errors = '';
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const regexTwo = /@/;

  if (values.length === 0) {
    errors = 'Email is mandatory!';
  } else if (!regexTwo.test(values)) {
    errors = 'Please include an "@" in your email address';
  } else if (!regex.test(values)) {
    errors = 'Please enter a valid email address!';
  } else if (values.length > 30) {
    errors = 'Email address must be under 30 characters.';
  }
  return errors;
};

export const passwordValidate = (values: string) => {
  let errors = '';
  const regexLetters = /^(?=.*[a-z])(?=.*[A-Z])/;
  const regexNumbers = /^(?=.*[0-9])/;

  if (values.length === 0) {
    errors = 'Password is mandatory!';
  }  else if (values.length < 8) {
    errors = 'Password be must be eight characters or longer';
  } else if (values.length > 30) {
    errors = 'Passwrod must be under 30 characters.';
  }

  return errors;
};

export const usernameValidate = (values: string) => {
  let errors = '';
  const regexLetters = /^[a-zA-Z]+$/;

  if (values.length === 0) {
    errors = 'Username is mandatory!';
  } else if (!regexLetters.test(values)) {
    errors = 'Username must contain at least one lowercase and one uppercase letter, and only alphabetic characters';
  } else if (!/^[a-z]/.test(values)) {
    errors = 'Username must start with a lowercase letter';
  } else if (values.length < 5) {
    errors = 'Username must be five characters or longer';
  } else if (values.length > 13) {
    errors = 'Username must be under 30 characters.';
  }

  return errors;
};
