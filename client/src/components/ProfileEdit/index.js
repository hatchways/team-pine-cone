import "date-fns";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../contexts/user";
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  Snackbar, 
  Switch
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PhoneInput from "material-ui-phone-number";
import { genders } from "./data";
import { Alert } from "@material-ui/lab/";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { addYears } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import useForm from "../useForm";

const useStyles = makeStyles((theme) => ({
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
    maxWidth: "900px"
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
    marginBottom: "3em"
  },
  switch: {
    margin: "10px 5px"
  }
}));

const InputText = function ({
  id,
  placeholder,
  children,
  value,
  handleChange,
}) {
  const classes = useStyles();

  return (
    <Grid container item className={classes.input}>
      <Grid item xs={4} md={3}>
        <Typography className={classes.label} component="label" htmlFor={id}>
          {children}
        </Typography>
      </Grid>
      <Grid item xs={8} md={7}>
        <TextField
          onChange={handleChange}
          id={id}
          name={id}
          fullWidth
          variant="outlined"
          value={value}
          placeholder={placeholder}
        />
      </Grid>
    </Grid>
  );
};

const Label = function ({ children, id }) {
  const classes = useStyles();

  return (
    <Typography className={classes.label} component="label" htmlFor={id}>
      {children}
    </Typography>
  );
};

const capitaleachword = (str) =>
  str
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1, s.length))
    .join(" ");

const minDate = addYears(new Date(), -18);

const initialForm = {
  firstName: "",
  lastName: "",
  gender: "",
  birthDate: minDate,
  email: "",
  address: "",
  phone: "",
  description: "",
  isSitter: false
};

const ProfileEdit = function () {
  const { user } = useUserContext();
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
    handleCheckboxChange
  } = useForm(initialForm);

  useEffect(() => {
    fetch(`/profile/${user.profile}`)
      .then((res) => res.json())
      .then((profile) =>
        setValues((values) => ({
          ...values,
          ...profile,
          gender:
            profile.gender === "non-binary"
              ? "Non-Binary"
              : capitaleachword(profile.gender),
          birthDate: new Date(profile.birthDate),
          email: user.email,
        }))
      );
  }, [user.email, user.profile, setValues]);

  const handlePhone = (value) => {
    if (!/\+1 \(\d{3}\) \d{3}-\d{4}/.test(value)) {
      setErrors({ ...errors, phone: "Phone number is invalid" });
      setDisableSubmit(true);
    } else {
      setErrors({ ...errors, phone: "" });
      setDisableSubmit(false);
    }

    setValues({ ...values, phone: value });
  };

  const handleEmail = (e) => {
    const text = e.currentTarget.value;
    if (!/.+@.+..+/.test(text)) {
      setErrors({ ...errors, email: "Email is not valid" });
      setDisableSubmit(true);
    } else {
      setErrors({ ...errors, email: "" });
      setDisableSubmit(false);
    }

    setValues({ ...values, email: text });
  };

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

      {/*GENDER*/}
      <Grid container item className={classes.input}>
        <Grid item xs={4} md={3}>
          <Label id="gender">GENDER</Label>
        </Grid>
        <Grid item xs={8} md={5}>
          <TextField
            id="gender"
            name="gender"
            value={values.gender}
            onChange={handleInputChange}
            select
            className={classes.select}
            variant="outlined"
          >
            {genders.map((value) => (
              <MenuItem value={value} key={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

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
