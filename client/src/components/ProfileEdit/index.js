import React, { useState, useEffect } from "react";
import { useUserContext } from '../../contexts/user';
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
    margin: "auto",
    maxWidth: "1200px",
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

const InputText = function ({ id, placeholder, children, value, handleChange }) {
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
		value={ value }
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

const capitaleachword = str => str
	.split(' ')
	.map(s => s.charAt(0).toUpperCase() + s.slice(1, s.length))
	.join(' ');

const ProfileEdit = function () {

	const { user } = useUserContext();
  const classes = useStyles();
  const [form, setForm] = useState(initialForm);
	const [emailError, setEmailError] = useState('');


	  const wow = Object.entries(form)
		  .filter(([,value]) => value)
	  		.reduce((acc, [key, value]) => ({...acc, [key]: value}), {})
	console.log(wow)

	useEffect(() => {
		fetch(`/profile/${ user.profile }`)
			.then(data => data.json())
			.then(profile => setForm({ 
				...form,
				...profile,
				email: user.email,
				gender: capitaleachword(profile.gender)
			}))
	}, [user.profileId, user.email]);

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
		setEmailError('Email is not valid');
	  } else { 
		setEmailError('');
	  }

    setForm({ ...form, email: text });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
	  Object.entites(form)
		  .filter(([,value]) => value)
	  		.reduce((acc, [key, value]) => ({[key]: value}), {})

	  if (!emailError) { 
		  fetch(`/profile/${user._id}`, {
				header: 'Content-Type: application/json',
			  body: {  }
		  })
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
	  value={ form.firstName }
        handleChange={handleText("firstName")}
      >
        FIRST NAME
      </InputText>

      {/*LAST NAME*/}
      <InputText
        id="last-name"
        placeholder="Doe"
	  value={ form.lastName }
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
		  error={ !!emailError }
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
		  value={ form.address }
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
		  value={ form.gender }
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
		  value={ form.birthDate }
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
		  value={ form.phone }
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
		  value={ form.description }
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
