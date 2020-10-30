import React, { useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/styles/";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import { Rating } from "@material-ui/lab/";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { addDays } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  Fab,
  Slider,
} from "@material-ui/core/";

const useStyle = makeStyles((theme) => ({
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "auto",
    borderRadius: "50px",
    padding: "0.8em",
    transition: "all 0.3s",
    color: "white",
    "&:hover": {
      background: theme.palette.primary.main,
      opacity: 0.8,
    },
    "&:hover svg": {
      fill: theme.palette.primary.main,
      opacity: 1,
      background: "white",
    },
    "&:hover input": {
      color: "white",
    },
    "&:hover label": {
      color: "white",
    },
    "&:hover button": {
      background: "white",
    },
  },
  icon: {
    marginRight: "10px",
    background: theme.palette.primary.main,
    fill: "white",
    borderRadius: "50%",
    padding: "0.2em",
    cursor: "pointer",
  },
  fab: {
    marginLeft: "auto",
    transition: "none",
  },
  fromDate: {
    marginRight: "1em",
  },
  title: {
    color: theme.palette.primary.main,
  },
  top: {
    marginTop: "2em",
  },
}));

const valuePriceText = (value) => `$${value}`;

const SearchFilter = function (props) {
  const classes = useStyle();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    setValues,
    values,
    handleInputChange,
    handleDateChange,
    updateSitters,
  } = props;

  const handleSliders = (prop) => (e, newValue) => {
    setValues({ ...values, [prop]: newValue });
  };

  const handleClickIcon = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();

    //restart at page one
    setValues({ ...values, page: 1 });

    let form = values;

    if (!values.fromDate || !values.toDate || values.fromDate > values.toDate) {
      const { fromDate, toDate, ...restForm } = form;
      form = restForm;
    } else {
      form.fromDate = new Date(form.fromDate).toISOString();
      form.toDate = new Date(form.toDate).toISOString();
    }

    fetch("/profile?" + new URLSearchParams(form).toString())
      .then((res) => res.json())
      .then((data) => {
        	console.log(data);
        updateSitters(data);
      });
  };

  return (
    <Grid
      container
      onSubmit={handleSubmit}
      component="form"
      className={classes.container}
    >
      <Grid item>
        <SearchIcon
          className={classes.icon}
          fontSize="large"
          onClick={handleClickIcon}
        />
        <TextField
          label="Search"
          name="search"
          value={values.search}
          onChange={handleInputChange}
        />
      </Grid>
      <Fab
        color="primary"
        size="small"
        className={classes.fab}
        onClick={() => setIsDialogOpen(true)}
      >
        <AddIcon />
      </Fab>

      {/*Filters*/}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="filters-dialog-title"
        className={classes.dialog}
      >
        <DialogTitle id="filters-dialog-title" className={classes.title}>
          Filter Options
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ marginBottom: "1em" }}>
            Ratings
          </DialogContentText>
          <Rating
            name="rating"
            defaultValue={0}
            onChange={handleInputChange}
            value={Number(values.rating)}
            size="large"
          />
          <DialogContentText style={{ marginTop: "2em" }}>
            ($) Hourly Rate
          </DialogContentText>
          <Slider
            min={0}
            max={300}
            name="price-range"
            value={values.hourlyRateRange}
            onChange={handleSliders("hourlyRateRange")}
            valueLabelDisplay="auto"
            aria-labelledby="price-slider"
            getAriaValueText={valuePriceText}
          />
          <DialogContentText style={{ marginTop: "2em" }}>
            Availability
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label="From"
              disablePast
              onChange={handleDateChange("fromDate")}
              showTodayButton
              className={classes.fromDate}
              value={values.fromDate}
            />
            <DateTimePicker
              label="To"
              disablePast
              onChange={handleDateChange("toDate")}
              minDate={addDays(values.fromDate, 1)}
              value={values.toDate}
              disabled={values.fromDate === null}
            />
          </MuiPickersUtilsProvider>
          <DialogContentText style={{ marginTop: "2.4em" }}>
            Sort By
          </DialogContentText>
          <FormControl>
            <RadioGroup
              aria-label="sorting category"
              name="sortBy"
              value={values.sortBy}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="firstName"
                control={<Radio color="primary" />}
                label="First Name"
              />
              <FormControlLabel
                value="location"
                control={<Radio color="primary" />}
                label="Location"
              />
              <FormControlLabel
                value="rating"
                control={<Radio color="primary" />}
                label="Rating"
              />
              <FormControlLabel
                value="availability.start"
                control={<Radio color="primary" />}
                label="Availability"
              />
              <FormControlLabel
                value="hourlyRate"
                control={<Radio color="primary" />}
                label="Hourly Rate"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default SearchFilter;
