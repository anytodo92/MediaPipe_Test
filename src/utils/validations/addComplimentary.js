// Yup
const yup = require('yup');

export const addComplimentarySchema = yup.object().shape({
  description: yup.string().required('Enter description'),
  product_id: yup
    .object()
    .shape({
      id: yup.number(),
      name: yup.string(),
    })
    .nullable(),
  price: yup.number().required('Enter price'),
  qty: yup.number().required('Enter quantity').min(1, 'Should not be less than 1'),
  total_amount: yup.number().required('Enter amount'),
});
