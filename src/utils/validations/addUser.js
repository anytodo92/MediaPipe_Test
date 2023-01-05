// Yup
const yup = require('yup');

export const addUserSchema = yup.object().shape({
  fname: yup.string().required('Enter first name'),
  mname: yup.string().required('Enter middle name'),
  lname: yup.string().required('Enter last name'),
  contact_num: yup.string().required('Enter contact number'),
  username: yup.string().required('Enter username'),
  email: yup.string().email('Email address is invalid').required('Enter email address'),
  password: yup
    .string()
    .required('Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/,
      'Password must contain at least 8 characters and at least one uppercase and one lowercase letter'
    ),
  user_type_id: yup
    .object()
    .shape({
      id: yup.number(),
      name: yup.string(),
    })
    .nullable()
    .required('Select role'),
});
