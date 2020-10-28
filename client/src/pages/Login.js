import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Card, Toolbar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import useForm from "../components/useForm";
import Input from "../components/controls/Input";
import { useUserContext } from "../contexts/user";

import Copyright from "../components/Copyright";
import useFormStyles from "../themes/useFormStyles";

const initialFormValues = {
  email: "",
  password: "",
  remember: false,
};

export default function SignIn() {
  const classes = useFormStyles();
  const { user, errorMessage, handleLogIn } = useUserContext();

  const {
    values,
    setErrors,
    errors,
    handleInputChange,
    handleCheckboxChange,
  } = useForm(initialFormValues);

  useEffect(() => { 
    if (errorMessage === "Forbidden") { 
      setErrors({ 
        email: "Email may be invalid",
        password: "Password may be invalid"
      });
    }
  }, [errorMessage, setErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!/.+@.+..+/.test(values.email)) errors.email = "Email is not valid.";
    if (values.password.length < 6)
      errors.password = "Minimum of 6 charactes required.";

    setErrors({ ...errors });

    if (Object.keys(errors).length === 0) {
      handleLogIn(values);
    }
  };

  return !user ? (
    <Fragment>
      <Toolbar />
      <Container component="main" maxWidth="xs">
        <Card className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Input
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={errors.email}
              autoFocus
              value={values.email}
              onChange={handleInputChange}
            />
            <Input
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={errors.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  onChange={handleCheckboxChange}
                  checked={values.remember}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container alignItems="center" direction="column">
              <Grid item>
                <NavLink className={classes.link} to="/signup">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </form>
          <Copyright />
        </Card>
      </Container>
    </Fragment>
  ) : (
    <Redirect to="/" />
  );
}
