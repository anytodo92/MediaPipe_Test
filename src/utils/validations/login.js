// Yup
const yup = require('yup');

export const loginSchema = yup.object().shape({
  email: yup.string().required('Enter your username or email address'),
  password: yup.string().required('Enter your password'),
});
