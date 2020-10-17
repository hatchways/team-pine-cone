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
  },
  mainContainer: {
    margin: "2em auto",
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
/*
 * Form props include:
 * {
 * 		firstName,
 * 		lastName,
 * 		gender,
 * 		month,
 * 		day,
 * 		year,
 * 		email,
 * 		phone,
 * 		address,
 * 		description
 * }
 */

const ProfileEdit = function () {
  const classes = useStyles();
  const [form, setForm] = useState({});

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
        <Typography variant="h2">Edit Profile</Typography>
      </Grid>
      <InputText
        id="first-name"
        placeholder="John"
        handleChange={handleText("firstName")}
      >
        FIRST NAME
      </InputText>
      <InputText
        id="last-name"
        placeholder="Doe"
        handleChange={handleText("lastName")}
      >
        LAST NAME
      </InputText>
      <Grid container item className={classes.input}>
        <Grid item xs={4}>
          <Label id="gender">GENDER</Label>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="gender"
            value={form.gender || ""}
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
      <Grid container item alignItems="center" className={classes.input}>
        <Grid item xs={4}>
          <Label>BIRTH DATE</Label>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="birth-date"
            type="date"
            className={classes.select}
            onChange={handleText("birthDate")}
          />
        </Grid>
      </Grid>
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
      <Grid container item className={classes.input}>
        <Grid item xs={4}>
          <Label id="phone">PHONE NUMBER</Label>
        </Grid>
        <Grid container alignItems="center" item xs={6}>
          <Grid container item alignItems="center" justify="space-between">
            <PhoneInput
              defaultCountry="ca"
              regions="north-america"
              onChange={handlePhone}
            />
          </Grid>
        </Grid>
      </Grid>
      <InputText
        id="address"
        placeholder="Address"
        handleChange={handleText("address")}
      >
        WHERE YOU LIVE
      </InputText>
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
