// validates email format using a basic regular expression
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// validates login credentials against predefined admin values
export const validateLogin = (email, password, prefEmail, prefPass) => {
  return email === prefEmail && password === prefPass;
};