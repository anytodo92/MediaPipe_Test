// Yup
const yup = require('yup');

export const addExpenseSchema = yup.object().shape({
  description: yup.string().required('Enter description'),
  product_id: yup
    .object()
    .shape({
      id: yup.number(),
      name: yup.string(),
    })
    .nullable(),
  amount: yup.number().required('Enter amount'),
});
