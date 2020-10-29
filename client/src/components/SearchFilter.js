import React, { useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/styles/";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import { Rating } from "@material-ui/lab/";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { addDays } from "date-fns";
import useForm from "./useForm";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Input,
  InputBase,
  Button,
  TextField,
  Fab,
  Slider,
  Switch,
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
		opacity: 0.8
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
  },
  fab: {
    marginLeft: "auto",
    transition: "none",
  },
  fromDate: {
    marginRight: "1em",
  },
	title: { 
		color: theme.palette.primary.main
	},
	dialog: { 
		"& p": { 
			margin: "1em 0"
		},
	},
	top: { 
		marginTop: "2em"
	}
}));

const form = {
  rating: 0,
  price: [0, 300],
  fromDate: null,
  toDate: null,
  sortBy: "sitters",
};

const valuePriceText = (value) => `$${value}`;

const SearchFilter = function () {
  const classes = useStyle();
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const { values, handleInputChange, setValues, handleDateChange } = useForm(
    form
  );

  const handleSliders = (prop) => (e, newValue) => {
    setValues({ ...values, [prop]: newValue });
  };

  return (
    <Grid container component="form" className={classes.container}>
      <Grid item>
        <SearchIcon className={classes.icon} fontSize="large" />
        <TextField label="Search" />
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
        <DialogTitle id="filters-dialog-title" className={classes.title}>Filter Options</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogSection}>Ratings</DialogContentText>
          <Rating
            name="sitter-ratings"
            defaultValue={0}
            onChange={handleInputChange}
            values={values.rating}
            size="large"
          />
          <DialogContentText>($) Price</DialogContentText>
          <Slider
            min={0}
            max={300}
            name="price-range"
            value={values.price}
            onChange={handleSliders("price")}
            valueLabelDisplay="auto"
            aria-labelledby="price-slider"
            getAriaValueText={valuePriceText}
          />
          <DialogContentText>Availability</DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label="From"
              value={values.date}
              disablePast
              onChange={handleDateChange("fromDate")}
              showTodayButton
              className={classes.fromDate}
              value={values.fromDate}
            />
            <DateTimePicker
              label="To"
              value={values.date}
              disablePast
              onChange={handleDateChange("toDate")}
              minDate={addDays(values.fromDate, 1)}
              value={values.toDate}
              disabled={values.fromDate === null}
            />
          </MuiPickersUtilsProvider>
          <DialogContentText>Sort By</DialogContentText>
          <FormControl>
            <RadioGroup
              aria-label="sorting category"
              name="sortBy"
              value={values.sortBy}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="sitters"
                control={<Radio color="primary" />}
                label="Dog Sitters"
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
