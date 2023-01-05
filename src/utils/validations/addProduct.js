// Yup
const yup = require('yup');

export const addProductSchema = yup.object().shape({
  description: yup.string().required('Enter description'),
  original_price: yup.string().required('Enter original price'),
  price_m_new: yup.string().required('Enter price member new'),
  price_m_old: yup.string().required('Enter price member old'),
  price_employee: yup.string().required('Enter price for employee'),
  product_type: yup
    .object()
    .shape({
      id: yup.number(),
      name: yup.string(),
    })
    .nullable()
    .required('Enter product type'),
});
