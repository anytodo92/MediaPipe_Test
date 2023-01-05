// Yup
const yup = require('yup');

export const addFilterSchema = yup.object().shape({
  filter_description: yup.string().required('Select filter description'),
  remarks: yup.string().nullable(),
  qty: yup.number().required('Enter quantity').min(1, 'Should not be less than 1'),
  date_changed: yup.date().typeError('Invalid date').required('Select date changed'),
});
