import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
  ButtonGroup,
  Button,
} from "@material-ui/core/";

const useStyle = makeStyles((theme) => ({
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "auto",
    background: theme.palette.primary.light,
    borderRadius: "10px",
    padding: "0.8em",
    marginBottom: "3em",
    transition: "all 0.3s",
    color: "white",
    boxShadow: "13px 11px 15px 5px rgba(0,0,0,0.84)",
    "& svg": {
      fill: theme.palette.primary.main,
      background: "white",
    },
    "&:hover button": {
      fill: theme.palette.primary.main,
      background: "white",
    },
    "&:hover input": {
      color: "white",
    },
    "&:hover label": {
      color: "white",
    },
    "& button": {
      background: "white",
      transition: "none",
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
  const history = useHistory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    setValues,
    values,
    handleInputChange,
    handleDateChange,
    initForm,
  } = props;

  const handleSliders = (prop) => (e, newValue) => {
    setValues({ ...values, [prop]: newValue });
  };

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

    form.page = 1;

    history.push("/profiles?" + new URLSearchParams(form).toString());
  };

  const handleCloseOptions = (e) => {
    setIsDialogOpen(false);
    handleSubmit(e);
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
          onClick={handleSubmit}
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
          <Grid container justify="space-between">
            Filter Options
            <ButtonGroup
              variant="text"
              color="primary"
              aria-label="clear and search button options"
            >
              <Button onClick={() => setValues(initForm)}>Clear Options</Button>
              <Button onClick={handleCloseOptions}>Search</Button>
            </ButtonGroup>
          </Grid>
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
            max={50}
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
            Search By
          </DialogContentText>
          <FormControl>
            <RadioGroup
              aria-label="Seach category"
              name="searchBy"
              value={values.searchBy}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
              />
              <FormControlLabel
                value="location"
                control={<Radio color="primary" />}
                label="Location"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default SearchFilter;
