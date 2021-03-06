import "date-fns";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../contexts/user";
import { useProfileContext } from "../../contexts/profile";
import { Grid, TextField, Button, Snackbar, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PhoneInput from "material-ui-phone-number";
import { genders, jobTitles, emailRegEx } from "./data";
import { Alert } from "@material-ui/lab/";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { addYears } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import useForm from "../useForm";
import InputText from "./InputText";
import Label from "./Label";
import Select from "./Select";

export const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: "bold",
    letterSpacing: "0.7px",
    cursor: "pointer",
    padding: "1.5em",
    display: "block",
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.66em",
    },
  },
  mainContainer: {
    margin: "auto",
    maxWidth: "900px",
  },
  input: {
    marginBottom: "1em",
  },
  select: {
    width: "100%",
  },
  button: {
    textTransform: "none",
    fontWeight: "bold",
  },
  date: {
    width: "100%",
  },
  bigRedButton: {
    ...theme.buttons.bigRedButton,
    marginTop: "2.5em",
  },
  title: {
    marginBottom: "3em",
  },
  switch: {
    margin: "10px 5px",
  },
}));

const capitaleachword = (str) =>
  str
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1, s.length))
    .join(" ");

const minDate = addYears(new Date(), -18);

const genderCheck = (gender) =>
  gender === "non-binary" ? "Non-Binary" : capitaleachword(gender);

const initialForm = {
  firstName: "",
  lastName: "",
  gender: "",
  birthDate: minDate,
  email: "",
  address: "",
  phone: "",
  description: "",
  hourlyRate: 0,
  jobTitle: "",
  isSitter: false,
};

const ProfileEdit = function () {
  const { user, handleSetUser } = useUserContext();
  const { profile, pullProfile } = useProfileContext();
  const classes = useStyles();
  const [isSaved, setIsSaved] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleDateChange,
    handleCheckboxChange,
  } = useForm(initialForm);

  useEffect(() => {
    setValues((values) => ({
      ...values,
      ...profile,
		gender: genderCheck(profile ? profile.gender : ""),
      birthDate: new Date(profile && profile.birthDate),
      email: user.email,
    }));
  }, [profile, user.email, setValues]);

  const validateHandler = (validator, errMsg, prop) => (e) => {
    const value = e.target ? e.target.value : e;

    if (!validator.test(value)) {
      setErrors({ ...errors, [prop]: errMsg });
      setDisableSubmit(true);
    } else {
      setErrors({ ...errors, [prop]: "" });
      setDisableSubmit(false);
    }

    setValues({ ...values, [prop]: value });
  };

  const handleEmail = validateHandler(
    emailRegEx,
    "Email is not valid",
    "email"
  );
  const handleHourlyRate = validateHandler(
    /^\d*(\.\d{0,2})?$/,
    "Enter a valid hourly rate eg 14.55",
    "hourlyRate"
  );
  const handlePhone = validateHandler(
    /\+1 \(\d{3}\) \d{3}-\d{4}/,
    "Phone number is invalid",
    "phone"
  );

  const handleCloseSaved = () => {
    setIsSaved(false);
    setDisableSubmit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanForm = {
      ...values,
      gender: values.gender.toLowerCase(),
    };

    setDisableSubmit(true);

    fetch(`/profile/${user.profile}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanForm),
    })
      .then((res) => res.json())
      .then(({ profile }) => {
        fetch("/user/me")
          .then((res) => res.json())
          .then(({ user }) => handleSetUser(user))
          .then(() => pullProfile());
      })
      .then(() => setIsSaved(true));
  };

  return (
    <Grid
      component="form"
      className={classes.mainContainer}
      container
      direction="column"
      alignItems="center"
      onSubmit={handleSubmit}
      noValidate
    >
      <Grid item>
        <h2 className={classes.title}>Edit Profile</h2>
      </Grid>

      {/*FIRST NAME*/}
      <InputText
        id="firstName"
        placeholder="John"
        value={values.firstName}
        handleChange={handleInputChange}
      >
        FIRST NAME
      </InputText>

      {/*LAST NAME*/}
      <InputText
        id="lastName"
        placeholder="Doe"
        value={values.lastName}
        handleChange={handleInputChange}
      >
        LAST NAME
      </InputText>

      <Grid container item className={classes.input}>
        <Grid item xs={4} md={3}>
          <Label id="isSitter">I AM {!values.isSitter && "NOT "}A SITTER</Label>
        </Grid>
        <Grid item xs={8} md={7}>
          <Switch
            id="isSitter"
            name="isSitter"
            checked={values.isSitter}
            onChange={handleCheckboxChange}
            className={classes.switch}
          />
        </Grid>
      </Grid>

      {/*EMAIL ADDRESS*/}
      <Grid container item className={classes.input}>
        <Grid item xs={4} md={3}>
          <Label id="email">EMAIL ADDRESS</Label>
        </Grid>
        <Grid item xs={8} md={7}>
          <TextField
            id="email"
            fullWidth
            variant="outlined"
            type="email"
            error={!!errors.email}
            label={errors.email || ""}
            value={values.email}
            placeholder="john-doe@gmail.com"
            onChange={handleEmail}
          />
        </Grid>
      </Grid>

      {/*ADDRESS*/}
      <InputText
        id="address"
        placeholder="Address"
        value={values.address}
        handleChange={handleInputChange}
      >
        WHERE YOU LIVE
      </InputText>

      {/*HOURLY RATE*/}
      {profile && profile.isSitter && (
        <React.Fragment>
          <Grid container item className={classes.input}>
            <Grid item xs={4} md={3}>
              <Label id="hourlyRate">HOURLY RATE</Label>
            </Grid>
            <Grid item xs={8} md={5}>
              <TextField
                id="hourlyRate"
                fullWidth
                variant="outlined"
                inputProps={{ min: "0" }}
                type="number"
                onBlur={() =>
                  setValues({
                    ...values,
                    hourlyRate: Number(values.hourlyRate).toFixed(2),
                  })
                }
                error={!!errors.hourlyRate}
                label={errors.hourlyRate || ""}
                value={values.hourlyRate}
                onChange={handleHourlyRate}
              />
            </Grid>
          </Grid>

          {/*JOB TITLE*/}
          <Select
            label="JOB TITLE"
            id="jobTitle"
            value={values.jobTitle}
            handle={handleInputChange}
            items={jobTitles}
          />
        </React.Fragment>
      )}

      {/*GENDER*/}
      <Select
        label="GENDER"
        id="gender"
        value={values.gender}
        handle={handleInputChange}
        items={genders}
      />

      {/*BIRTH DATE*/}
      <Grid container item alignItems="center" className={classes.input}>
        <Grid item xs={4} md={3}>
          <Label>BIRTH DATE</Label>
        </Grid>
        <Grid item xs={8} md={5}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={values.birthDate || minDate}
              className={classes.select}
              maxDate={minDate}
              format="dd/MM/yyyy"
              views={["year", "month", "date"]}
              disableFuture
              onChange={handleDateChange("birthDate")}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>

      {/*PHONE NUMBER*/}
      <Grid container item className={classes.input}>
        <Grid item xs={4} md={3}>
          <Label id="phone">PHONE NUMBER</Label>
        </Grid>
        <Grid container alignItems="center" item xs={8} md={5}>
          <Grid container item alignItems="center" justify="space-between">
            <PhoneInput
              label={errors.phone || ""}
              error={!!errors.phone}
              defaultCountry="ca"
              className={classes.select}
              value={values.phone}
              regions="north-america"
              onChange={handlePhone}
            />
          </Grid>
        </Grid>
      </Grid>

      {/*DESCRIPTION*/}
      <Grid item container className={classes.input}>
        <Grid item xs={4} md={3}>
          <Label id="description">DESCRIBE YOURSELF</Label>
        </Grid>
        <Grid item xs={8} md={7}>
          <TextField
            id="description"
            name="description"
            multiline
            fullWidth
            value={values.description}
            rows={6}
            variant="outlined"
            placeholder="About you"
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          disabled={isSaved || disableSubmit}
          size="large"
          className={classes.bigRedButton}
          type="submit"
        >
          Save
        </Button>
      </Grid>
      <Snackbar
        open={isSaved}
        onClose={handleCloseSaved}
        autoHideDuration={3000}
      >
        <Alert severity="success" variant="filled">
          Saved!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ProfileEdit;
