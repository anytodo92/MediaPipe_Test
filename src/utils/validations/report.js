// Yup
const yup = require('yup');

const today = new Date().toDateString();

export const reportSchema = yup.object().shape({
  role: yup.number().nullable(),
  isProduct: yup.boolean(),
  isContainer: yup.boolean(),
  hasReportType: yup.boolean(),

  product_id: yup.string().when(['isProduct', 'isContainer'], {
    is: (isProduct, isContainer) => isProduct || isContainer,
    then: yup.string().required('Select a product'),
  }),

  isOfficial: yup.string().when('hasReportType', {
    is: true,
    then: yup.string().required('Select report type'),
  }),

  start_date: yup
    .date()
    .typeError('Invalid date')
    .required('Select start date')
    .when('role', {
      is: 1,
      otherwise: (d) =>
        d
          .min(today, 'You are not allowed to select other dates other than today')
          .max(today, 'You are not allowed to select other dates other than today'),
    }),
  end_date: yup
    .date()
    .typeError('Invalid date')
    .required('Select end date')
    .when('role', {
      is: 1,
      otherwise: (d) =>
        d
          .min(today, 'You are not allowed to select other dates other than today')
          .max(today, 'You are not allowed to select other dates other than today'),
    }),
});
