// Yup
const yup = require('yup');

export const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Enter your new password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/,
      'Password must contain at least 8 characters and at least one uppercase and one lowercase letter'
    ),
  confirm_password: yup
    .string()
    .required('Enter confirm new password')
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], 'Password do not match'),
    }),
});
