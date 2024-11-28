export const validateName = (name: string) => {
  const nameRegex = /^[A-Za-z]+$/;
  if (!name) {
    return {value: name, error: 'Name is required'};
  }
  if (!nameRegex.test(name)) {
    return {value: name, error: 'Name should only contain alphabets'};
  }
  return {value: name, error: ''};
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return {value: email, error: 'Email is required'};
  }
  if (!emailRegex.test(email)) {
    return {value: email, error: 'Invalid email address'};
  }
  return {value: email, error: ''};
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const phoneNumberRegex = /^\d{10,15}$/;
  if (!phoneNumber) {
    return {value: phoneNumber, error: 'Phone number is required'};
  }
  if (!phoneNumberRegex.test(phoneNumber)) {
    return {value: phoneNumber, error: 'Invalid phone number'};
  }
  return {value: phoneNumber, error: ''};
};

export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password) {
    return {value: password, error: 'Password is required'};
  }
  if (!passwordRegex.test(password)) {
    return {
      value: password,
      error:
        'Password must be at least 8 characters long, including one uppercase letter, one special character, one number, and one lowercase letter',
    };
  }
  return {value: password, error: ''};
};

export const validateRetypePassword = (
  password: string,
  retypePassword: string,
) => {
  if (!retypePassword) {
    return {value: retypePassword, error: 'Please retype the password'};
  }
  if (password !== retypePassword) {
    return {value: retypePassword, error: 'Passwords do not match'};
  }
  return {value: retypePassword, error: ''};
};
