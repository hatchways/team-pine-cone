import React from 'react';
import { NavLink } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import useForm from '../components/useForm';
import Input from '../components/controls/Input';
import { Toolbar } from '@material-ui/core';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        LovingSitter
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: "#DF1B1B",
    fontSize: "0.75rem",
    fontFamily: "Roboto",
    fontWeight: 400,
    lineHeight: 1.43,
    textDecoration: "none",
  },
}));

const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export default function SignUp() {
  
  const classes = useStyles();

  const validate = () => {
    let temp = {};
    temp.firstName = values.firstName ? "" : "This field is required.";
    temp.lastName = values.lastName ? "" : "This field is required.";
    temp.email = (/.+@.+..+/).test(values.email) ? "" : "Email is not valid";
    temp.password = values.password.length >= 6 ? "" : "Minimum of 6 charactes required.";
    temp.confirmPassword = values.confirmPassword === values.password ? "" : "Password does not match.";

    setErrors({
      ...temp
    });

    return Object.values(temp).every(x => x === "");
  }

  const {
    values,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialFormValues);

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      window.alert("testing...");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Toolbar />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input
                autoComplete="fname"
                name="firstName"
                id="firstName"
                label="First Name"
                value={values.firstName}
                onChange= {handleInputChange}
                autoFocus
                error={errors.fullName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                variant="outlined"
                id="lastName"
                label="Last Name"
                value={values.lastName}
                onChange= {handleInputChange}
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                variant="outlined"
                id="email"
                label="Email Address"
                value={values.email}
                onChange= {handleInputChange}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                value={values.password}
                onChange= {handleInputChange}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                value={values.confirmPassword}
                onChange= {handleInputChange}
                type="password"
                id="password-confirm"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink className={classes.link} to="/login" >
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}