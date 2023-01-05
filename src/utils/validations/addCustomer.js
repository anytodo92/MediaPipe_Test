// Yup
const yup = require('yup');

export const addCustomerSchema = yup.object().shape({
  fname: yup.string().required('Enter first name'),
  mname: yup.string().nullable(),
  lname: yup.string().required('Enter last name'),
  mobile_no: yup.string().required('Enter mobile number'),
  tel_no: yup.string().nullable(),
  member_status: yup
    .object()
    .shape({
      id: yup.number(),
      name: yup.string(),
    })
    .nullable()
    .required('Select member status'),
  address: yup.string().nullable(),
});
