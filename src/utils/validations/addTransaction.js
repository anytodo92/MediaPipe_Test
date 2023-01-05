import * as Yup from 'yup';

import { calculateProductsTotalPrice } from '../functions/calculateProductsTotalPrice';

export const addTransactionSchema = Yup.object().shape({
  created_at: Yup.date().max(new Date(), "Future date isn't allowed").required('Enter date').typeError('Invalid date'),
  customer: Yup.object().nullable().required('Select customer'),
  transactionType: Yup.object().nullable().required('Select transaction type'),
  isOfficial: Yup.boolean().nullable(),
  isDiscounted: Yup.boolean().nullable(),
  isCheck: Yup.boolean().nullable(),
  checkDetails: Yup.string().when('isCheck', {
    is: true,
    then: Yup.string().required('Please enter check details.'),
  }),
  receiptNumber: Yup.string().when('amountPaid', {
    is: (amountPaid) => amountPaid > 0,
    then: Yup.string().required('Enter receipt #').max(6, 'Maximum 6 digits only'),
  }),
  // receiptNumber: Yup.string().required('Enter receipt #').max(6, 'Maximum 6 digits only'),
  deliveryReceiptNumber: Yup.string().nullable().max(6, 'Maximum 6 digits only'),
  products: Yup.array()
    .min(1, 'At least 1 product is required')
    .of(
      Yup.object().shape({
        qty: Yup.number()
          .typeError('Enter quantity')
          .required('Enter quantity')
          .min(1, 'Quantity should not be less than 1'),
      })
    )
    .nullable()
    .required('Select product(s)'),
  containers: Yup.array().of(
    Yup.object().shape({
      remarks: Yup.string().nullable(),
      qty: Yup.number()
        .typeError('Enter quantity')
        .required('Enter quantity')
        .min(1, 'Quantity should not be less than 1'),
    })
  ),
  // remarks: Yup.string().required(' enter remarks'),
  amountPaid: Yup.number()
    .test('isLessThanTheTotalAmount', 'Amount paid should not be more than the total', function (item) {
      const total =
        Number(this.parent.isDiscounted) === 1
          ? calculateProductsTotalPrice(this.parent.products) - calculateProductsTotalPrice(this.parent.products) * 0.2
          : calculateProductsTotalPrice(this.parent.products);
      if (total === 0 || isNaN(total)) return true;
      return item <= total;
    })
    .required('Enter amount')
    .min(0, 'Amount paid should not be less than 0'),
});

// Number(values.isDiscounted) === 1
//   ? calculateProductsTotalPrice(productsValue) - calculateProductsTotalPrice(productsValue) * 0.2
//   : calculateProductsTotalPrice(productsValue);
