// Yup
const yup = require('yup');

export const payTransactionSchema = yup.object().shape({
  remaining_amount: yup.number().nullable(),
  amount: yup
    .number()
    .test('should-be-greather-than-yourField2', 'Amount to pay is greater than your amount payable', function (value) {
      const otherFieldValue = this.parent.remaining_amount;
      if (value > otherFieldValue) {
        return false;
      } else {
        return true;
      }
    })
    .required('Enter amount to pay'),
  isOfficial: yup.boolean().nullable(),
  receipt_no: yup.string().required('Enter receipt #').max(6, 'Maximum 6 digits only'),
  isCheck: yup.boolean().nullable(),
  check_details: yup
    .string()
    .nullable()
    .when('isCheck', {
      is: true,
      then: yup.string().required('Please enter check details.').typeError('Please enter check details'),
    }),
});
