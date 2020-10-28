import React from "react";
import "date-fns";
import { addYears } from "date-fns";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useForm from "../components/useForm";
import Input from "../components/controls/Input";
import { Toolbar } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import PhoneInput from "material-ui-phone-number";

import Copyright from "../components/Copyright";
import useFormStyles from "../themes/useFormStyles";

import { useUserContext } from "../contexts/user";

const minDate = addYears(new Date(), -18);

const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthDate: minDate,
  phone: "",
};

export default function SignUp() {
  const { handleRegister, user } = useUserContext();
  const classes = useFormStyles();

  const validate = () => {
    let temp = {};
    temp.firstName = values.firstName ? "" : "This field is required.";
    temp.lastName = values.lastName ? "" : "This field is required.";
    temp.email = /.+@.+..+/.test(values.email) ? "" : "Email is not valid";
    temp.phone = /\+1 \(\d{3}\) \d{3}-\d{4}/.test(values.phone) ? "" : "Phone number is not valid";
    temp.password =
      values.password.length >= 6 ? "" : "Minimum of 6 charactes required.";
    temp.confirmPassword =
      values.confirmPassword === values.password
        ? ""
        : "Password does not match.";

    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    errors,
    setErrors,
    handleInputChange,
    handleDateChange,
  } = useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleRegister(values);
    }
  };

  return !user ? (
    <Container component="main" maxWidth="xs">
      <Toolbar />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input
                variant="outlined"
                autoComplete="fname"
                name="firstName"
                id="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleInputChange}
                autoFocus
                error={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                variant="outlined"
                id="lastName"
                label="Last Name"
                value={values.lastName}
                onChange={handleInputChange}
                name="lastName"
                autoComplete="lname"
                error={errors.lastName}
              />
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableFuture
                  fullWidth
                  maxDate={minDate}
                  format="dd/MM/yyyy"
                  inputVariant="outlined"
                  openTo="year"
                  label="Date of birth"
                  views={["year", "month", "date"]}
                  value={values.birthDate}
                  onChange={handleDateChange("birthDate")}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <PhoneInput
                defaultCountry="ca"
                fullWidth
                variant="outlined"
                regions="north-america"
                onChange={handleDateChange("phone")}
                value={values.phone}
                error={!!errors.phone}
                label={errors.phone || "Phone Number"}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                variant="outlined"
                id="email"
                label="Email Address"
                value={values.email}
                onChange={handleInputChange}
                name="email"
                autoComplete="email"
                fullWidth
                error={errors.email}
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
                onChange={handleInputChange}
                type="password"
                id="password"
                autoComplete="current-password"
                error={errors.password}
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
                onChange={handleInputChange}
                type="password"
                id="password-confirm"
                error={errors.confirmPassword}
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
          <Grid container alignItems="center" direction="column">
            <Grid item>
              <NavLink className={classes.link} to="/login">
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
  ) : (
    <Redirect to="/" />
  );
}
