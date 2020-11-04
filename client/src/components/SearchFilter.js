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
  Typography,
} from "@material-ui/core/";
import FilterListIcon from "@material-ui/icons/FilterList";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import GradeIcon from "@material-ui/icons/Grade";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

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
  filter: {
    marginTop: "2em",
    width: "100%",
  },
  list: {
    width: "100%",
    "& svg": {
      background: "transparent",
    },
  },
}));

const valuePriceText = (value) => `$${value}`;

const filterOptionsList = [
  "name",
  "rating",
  "location",
  "availability",
  "price",
];

const SearchFilter = function (props) {
  const classes = useStyle();
  const history = useHistory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
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
    let form = { filter: filterOptionsList[selectedIndex], page: 1 };
    history.push("/profiles?" + new URLSearchParams(form).toString());
  };

  const handleCloseOptions = (e) => {
    setIsDialogOpen(false);
    handleSubmit(e);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
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

      <div className={classes.filter}>
        <Accordion>
          <AccordionSummary
            expandIcon={<FilterListIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              component="nav"
              className={classes.list}
              aria-label="main list of filters"
            >
              <ListItem
                button
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Name" />
              </ListItem>
              <ListItem
                button
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <GradeIcon />
                </ListItemIcon>
                <ListItemText primary="Rating" />
              </ListItem>
              <ListItem
                button
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Location" />
              </ListItem>
              <ListItem
                button
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemIcon>
                  <EventAvailableIcon />
                </ListItemIcon>
                <ListItemText primary="Availability" />
              </ListItem>
              <ListItem
                button
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
              >
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Price" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </div>

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
