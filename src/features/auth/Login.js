import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from 'app/services/auth';
import { setCredentials } from 'features/auth/slice';

// Material UI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

// Formik
import { Formik } from 'formik';

// Yup
import { loginSchema } from 'utils/validations';
import moment from 'moment-timezone/moment-timezone';

const Login = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  // if (isLoggedIn) {
  //   // return <Redirect to={referer || '/'} />;
  //   return <Navigate to="/" />;
  // }

  const [calculateTime, setCalculateTime] = useState(false)

  useEffect(() => {
    const time = "2022-12-27T03:59:00+01:00"

    const interval = setInterval((time) => {
      let diff = moment(
          moment(time).subtract(330, "minutes").format()
        ).diff(
          moment().subtract(330, "minutes").format(),
          "seconds"
        )

      if (diff < 0) {
        clearInterval(interval);
      }

      const isValid = moment()
        .subtract(330, "minutes")
        .isBetween(
          moment(time).subtract(450, "minutes").format(),
          moment(time).subtract(330, "minutes").format() 
        )
      console.log(
        moment().subtract(330, "minutes").format(), 
        moment(time).subtract(450, "minutes").format(),
        moment(time).subtract(330, "minutes").format(), 
        diff,
        isValid)
      setCalculateTime(isValid)
    }, 1000, time)
    return () => clearInterval(interval);
  }, [])

  return (
    <div style={{ height: '100vh' }}>
      <span>flag: {calculateTime ? 'true' : 'false'}</span>
      <Grid container direction="row" justifyContent="center">
        <Grid item xl={3} lg={3} md={4} sm={6} xs={11}>
          <Card>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={loginSchema}
              onSubmit={async (values) => {
                // const user = await login(values).unwrap();
                // dispatch(setCredentials(user));
                dispatch(setCredentials(values));
                navigate('/');
              }}
            >
              {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <CardContent sx={{ px: 4, py: 5 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'center',
                        my: 3,
                        color: 'info.main',
                      }}
                    >
                      Hello System
                    </Typography>
                    <Divider />
                    <Typography
                      variant="h5"
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        my: 3,
                        color: 'info.main',
                      }}
                    >
                      Log in
                    </Typography>
                    <StyledTextField
                      fullWidth
                      label="Username or email address"
                      name="email"
                      type="text"
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.email ? errors.email : ''}
                      error={touched.email && Boolean(errors.email)}
                    />
                    <StyledTextField
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      variant="outlined"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.password ? errors.password : ''}
                      error={touched.password && Boolean(errors.password)}
                    />
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={isLoading}
                      sx={{
                        width: '100%',
                        height: '48px',
                        textTransform: 'none',
                        mb: 2,
                      }}
                    >
                      {isLoading ? <CircularProgress size={30} /> : 'Log In'}
                    </Button>
                  </CardContent>
                </form>
              )}
            </Formik>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  background: 'none',
  '& input': {
    background: theme.palette.secondary.main,
    borderRadius: 6,
  },
  '& .MuiInputBase-root fieldset': {
    border: 'none',
  },
  '& .Mui-error fieldset, .Mui-focused fieldset': {
    border: '1px solid',
  },
  '& label': {
    fontStyle: 'italic',
    color: theme.palette.info.main,
  },
}));

export default Login;
