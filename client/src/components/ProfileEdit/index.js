import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PhoneInput from "material-ui-phone-number";
import { genders } from "./data";

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

const InputText = function ({ id, placeholder, children, handleChange }) {
  const classes = useStyles();

  return (
    <Grid container item className={classes.input}>
      <Grid item xs={4}>
        <Typography className={classes.label} component="label" htmlFor={id}>
          {children}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          onChange={handleChange}
          id={id}
          variant="outlined"
          fullWidth
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

const ProfileEdit = function () {
  const classes = useStyles();
  const [form, setForm] = useState(initialForm);

  const handle = (eventProp) => (formProp) => (e) => {
    setForm({ ...form, [formProp]: e[eventProp].value });
  };
  const handleText = handle("currentTarget");
  const handleSelect = handle("target");

  const handlePhone = (value) => {
    setForm({ ...form, phone: value });
  };

  const handleEmail = (e) => {
    //validate email here
    setForm({ ...form, email: e.currentTarget.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Success");
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
		  <h2>Edit Profile</h2>
      </Grid>

      {/*FIRST NAME*/}
      <InputText
        id="first-name"
        placeholder="John"
        handleChange={handleText("firstName")}
      >
        FIRST NAME
      </InputText>

      {/*LAST NAME*/}
      <InputText
        id="last-name"
        placeholder="Doe"
        handleChange={handleText("lastName")}
      >
        LAST NAME
      </InputText>

      {/*EMAIL ADDRESS*/}
      <Grid container item className={classes.input}>
        <Grid item xs={4}>
          <Label id="email">EMAIL ADDRESS</Label>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="email"
            fullWidth
            variant="outlined"
            type="email"
            placeholder="john-doe@gmail.com"
            onChange={handleEmail}
          />
        </Grid>
      </Grid>

      {/*ADDRESS*/}
      <InputText
        id="address"
        placeholder="Address"
        handleChange={handleText("address")}
      >
        WHERE YOU LIVE
      </InputText>

      {/*GENDER*/}
      <Grid container item className={classes.input}>
        <Grid item xs={4}>
          <Label id="gender">GENDER</Label>
        </Grid>
        <Grid item xs={4} sm={3}>
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
        <Grid item xs={4}>
          <Label>BIRTH DATE</Label>
        </Grid>
        <Grid item xs={4} sm={3}>
          <TextField
            id="birth-date"
            type="date"
            className={classes.select}
            onChange={handleText("birthDate")}
          />
        </Grid>
      </Grid>

      {/*PHONE NUMBER*/}
      <Grid container item className={classes.input}>
        <Grid item xs={4}>
          <Label id="phone">PHONE NUMBER</Label>
        </Grid>
        <Grid container alignItems="center" item xs={5} sm={4}>
          <Grid container item alignItems="center" justify="space-between">
            <PhoneInput
              defaultCountry="ca"
              className={classes.select}
              regions="north-america"
              onChange={handlePhone}
            />
          </Grid>
        </Grid>
      </Grid>

      {/*DESCRIPTION*/}
      <Grid item container className={classes.input}>
        <Grid item xs={4}>
          <Label id="description">DESCRIBE YOURSELF</Label>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="description"
            multiline
            fullWidth
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
          size="large"
          className={classes.bigRedButton}
          type="submit"
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProfileEdit;
