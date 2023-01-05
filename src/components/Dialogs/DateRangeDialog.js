import React, { useEffect } from 'react';
import HeaderDialog from './HeaderDialog';
import BodyDialog from './BodyDialog';
import FooterDialog from './FooterDialog';
import { formatDateYearFirst } from 'utils/functions';

// Material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts, getAllContainers } from 'actions';

// Formik
import { Formik } from 'formik';

// Yup
import { reportSchema } from 'utils/validations';

// Utils
import { SlideUp } from 'utils/animations';

// DateFns
import DateFnsUtils from '@date-io/date-fns';

const DateRangeDialog = ({ open, onAgree, onDisagree, details }) => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth?.profile?.user_type_id);

  const isSubmitting = useSelector((state) => state.user.isSubmitting);
  const products = useSelector((state) => state.product.products);
  const containers = useSelector((state) => state.product.containers);

  const today = new Date().toDateString();

  const reportTypes = [
    {
      id: 1,
      description: 'OR',
      value: '1',
    },
    {
      id: 2,
      description: 'non-OR',
      value: '0',
    },
    {
      id: 3,
      description: 'consolidated',
      value: '3',
    },
  ];

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllContainers());
  }, [dispatch]);

  const onSubmitDates = (dates) => {
    onAgree(dates);
  };

  return (
    <div>
      <Dialog disableBackdropClick disableEscapeKeyDown onClose={onDisagree} open={open} TransitionComponent={SlideUp}>
        <Formik
          initialValues={{
            role: role ? role : 2,
            isProduct: details ? details.isProduct : false,
            isContainer: details ? details.isContainer : false,
            hasReportType: details ? details?.hasReportType : false,
            product_id: '',
            isOfficial: {
              id: 3,
              description: 'consolidated',
              value: '3',
            },
            start_date: today,
            end_date: today,
          }}
          validationSchema={reportSchema}
          onSubmit={(values) => {
            let newValues = {
              ...values,
              start_date: formatDateYearFirst(values.start_date),
              end_date: formatDateYearFirst(values.end_date),
            };
            let { isContainer, isProduct, ...finalValues } = newValues;
            onSubmitDates(finalValues);
          }}
        >
          {({ values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <HeaderDialog onClose={onDisagree}>Choose Dates</HeaderDialog>
              <BodyDialog dividers>
                <Grid container direction="row" justify="center" spacing={2}>
                  {values.isProduct ? (
                    <Grid item lg={12} md={12} xs={12}>
                      <Autocomplete
                        value={values.product_id}
                        options={products ? products : []}
                        getOptionSelected={(option, value) => option.id === value.id}
                        getOptionLabel={(product) => product.description}
                        onChange={(e, value) => {
                          setFieldValue('product_id', value ? value : '');
                        }}
                        fullWidth
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Product"
                            name="product_id"
                            variant="outlined"
                            onBlur={handleBlur}
                            helperText={touched.product_id ? errors.product_id : ''}
                            error={touched.product_id && Boolean(errors.product_id)}
                          />
                        )}
                      />
                    </Grid>
                  ) : (
                    ''
                  )}

                  {values.isContainer ? (
                    <Grid item lg={12} md={12} xs={12}>
                      <Autocomplete
                        value={values.product_id}
                        options={containers ? containers : []}
                        getOptionSelected={(option, value) => option.id === value.id}
                        getOptionLabel={(product) => product.description}
                        onChange={(e, value) => {
                          setFieldValue('product_id', value ? value : '');
                        }}
                        fullWidth
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Container"
                            name="product_id"
                            variant="outlined"
                            onBlur={handleBlur}
                            helperText={touched.product_id ? errors.product_id : ''}
                            error={touched.product_id && Boolean(errors.product_id)}
                          />
                        )}
                      />
                    </Grid>
                  ) : (
                    ''
                  )}

                  {values.hasReportType ? (
                    <Grid item lg={12} md={12} xs={12}>
                      <Autocomplete
                        value={values.isOfficial}
                        options={reportTypes ? reportTypes : []}
                        getOptionSelected={(option, value) => option.value === value.value}
                        getOptionLabel={(report) => report.description}
                        onChange={(e, value) => {
                          setFieldValue('isOfficial', value ? value : '');
                        }}
                        fullWidth
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Report Type"
                            name="isOfficial"
                            variant="outlined"
                            onBlur={handleBlur}
                            helperText={touched.isOfficial ? errors.isOfficial : ''}
                            error={touched.isOfficial && Boolean(errors.isOfficial)}
                          />
                        )}
                      />
                    </Grid>
                  ) : (
                    ''
                  )}

                  <Grid item lg={6} md={6} xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        autoOk
                        minDate={role !== 1 ? new Date() : undefined}
                        maxDate={role !== 1 ? new Date() : undefined}
                        fullWidth
                        inputVariant="outlined"
                        id="date-picker-dialog"
                        label="From"
                        format="MM/dd/yyyy"
                        value={values.start_date}
                        onChange={(val) => {
                          setFieldValue('start_date', val ? val : '');
                        }}
                        onBlur={handleBlur}
                        helperText={touched.start_date ? errors.start_date : ''}
                        error={touched.start_date && Boolean(errors.start_date)}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid item lg={6} md={6} xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        autoOk
                        minDate={role !== 1 ? new Date() : undefined}
                        maxDate={role !== 1 ? new Date() : undefined}
                        disableFuture
                        fullWidth
                        inputVariant="outlined"
                        id="date-picker-dialog"
                        label="To"
                        format="MM/dd/yyyy"
                        value={values.end_date}
                        onChange={(val) => {
                          setFieldValue('end_date', val ? val : '');
                        }}
                        onBlur={handleBlur}
                        helperText={touched.end_date ? errors.end_date : ''}
                        error={touched.end_date && Boolean(errors.end_date)}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              </BodyDialog>
              <FooterDialog>
                <Button variant="outlined" onClick={onDisagree} size="small">
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained" disabled={isSubmitting} size="small">
                  {isSubmitting ? <CircularProgress size={30} /> : 'Submit'}
                </Button>
              </FooterDialog>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default DateRangeDialog;
