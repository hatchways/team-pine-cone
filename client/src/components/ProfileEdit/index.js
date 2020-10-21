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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PhoneInput from "material-ui-phone-number";
import { genders } from "./data";
import { Alert } from "@material-ui/lab/";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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
      <Grid item xs={4} md={2}>
        <Typography className={classes.label} component="label" htmlFor={id}>
          {children}
        </Typography>
      </Grid>
      <Grid item xs={8} md={7}>
        <TextField
          onChange={handleChange}
          id={id}
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

const initialForm = {
  firstName: "",
  lastName: "",
  gender: "",
  birthDate: "",
  email: "",
  address: "",
  phone: "",
  description: "",
};

const capitaleachword = (str) =>
  str
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1, s.length))
    .join(" ");

const ProfileEdit = function () {
  const { user } = useUserContext();
  const classes = useStyles();
  const [form, setForm] = useState(initialForm);
  const [emailError, setEmailError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  useEffect(() => {
    fetch(`/profile/${user.profile}`)
      .then((res) => res.json())
      .then((profile) =>
        setForm({
          ...form,
          ...profile,
          gender:
            profile.gender === "non-binary"
              ? "Non-Binary"
              : capitaleachword(profile.gender),
          birthDate: new Date(profile.birthDate),
          email: user.email,
        })
      );
  }, [user.email, user.profile]);

  const handle = (eventProp) => (formProp) => (e) => {
    setForm({ ...form, [formProp]: e[eventProp].value });
  };
  const handleText = handle("currentTarget");
  const handleSelect = handle("target");

  const handlePhone = (value) => {
    setForm({ ...form, phone: value });
  };

  const handleEmail = (e) => {
    const text = e.currentTarget.value;
    if (!/.+@.+..+/.test(text)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }

    setForm({ ...form, email: text });
  };

  const handleCloseSaved = () => {
    setIsSaved(false);
    setDisableSubmit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailError) {
      const cleanForm = {
        ...form,
        gender: form.gender.toLowerCase(),
      };

      setDisableSubmit(true);

      fetch(`/profile/${user.profile}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanForm),
      }).then(() => setIsSaved(true));
    }
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
        <Typography variant="h2">Edit Profile</Typography>
      </Grid>

      {/*FIRST NAME*/}
      <InputText
        id="first-name"
        placeholder="John"
        value={form.firstName}
        handleChange={handleText("firstName")}
      >
        FIRST NAME
      </InputText>

      {/*LAST NAME*/}
      <InputText
        id="last-name"
        placeholder="Doe"
        value={form.lastName}
        handleChange={handleText("lastName")}
      >
        LAST NAME
      </InputText>

      {/*EMAIL ADDRESS*/}
      <Grid container item className={classes.input}>
        <Grid item xs={4} md={2}>
          <Label id="email">EMAIL ADDRESS</Label>
        </Grid>
        <Grid item xs={8} md={7}>
          <TextField
            id="email"
            fullWidth
            variant="outlined"
            type="email"
            error={!!emailError}
		  	label={emailError || ''}
            value={form.email}
            placeholder="john-doe@gmail.com"
            onChange={handleEmail}
          />
        </Grid>
      </Grid>

      {/*ADDRESS*/}
      <InputText
        id="address"
        placeholder="Address"
        value={form.address}
        handleChange={handleText("address")}
      >
        WHERE YOU LIVE
      </InputText>

      {/*GENDER*/}
      <Grid container item className={classes.input}>
        <Grid item xs={4} md={2}>
          <Label id="gender">GENDER</Label>
        </Grid>
        <Grid item xs={8} md={7}>
          <TextField
            id="gender"
            value={form.gender}
            onChange={handleSelect("gender")}
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
        <Grid item xs={4} md={2}>
          <Label>BIRTH DATE</Label>
        </Grid>
        <Grid item xs={8} md={7}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              value={form.birthDate}
              className={classes.select}
              disableFuture
              onChange={(value) => setForm({ ...form, birthDate: value })}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>

      {/*PHONE NUMBER*/}
      <Grid container item className={classes.input}>
        <Grid item xs={4} md={2}>
          <Label id="phone">PHONE NUMBER</Label>
        </Grid>
        <Grid container alignItems="center" item xs={8} md={7}>
          <Grid container item alignItems="center" justify="space-between">
            <PhoneInput
              defaultCountry="ca"
              className={classes.select}
              value={form.phone}
              regions="north-america"
              onChange={handlePhone}
            />
          </Grid>
        </Grid>
      </Grid>

      {/*DESCRIPTION*/}
      <Grid item container className={classes.input}>
        <Grid item xs={4} md={2}>
          <Label id="description">DESCRIBE YOURSELF</Label>
        </Grid>
        <Grid item xs={8} md={7}>
          <TextField
            id="description"
            multiline
            fullWidth
            value={form.description}
            rows={6}
            variant="outlined"
            placeholder="About you"
            onChange={handleText("description")}
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
