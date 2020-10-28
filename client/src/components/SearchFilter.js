import React, { useState } from 'react';
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/styles/";
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import { Rating } from "@material-ui/lab/";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import useForm from "./useForm";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, FormControl, InputLabel, Input, InputBase, Button, TextField, Fab, Slider, Switch } from "@material-ui/core/";

const useStyle = makeStyles(theme => ({
	container: { 
		width: "100%",
		maxWidth: "400px",
		margin: "auto",
		borderRadius: "50px",
		padding: "0.8em",
		transition: "all 0.2s",
		color: "white",
		"&:hover": { 
			background: theme.palette.primary.main,
		},
		"&:hover svg": { 
			fill: theme.palette.primary.main,
			opacity: 1,
			background: "white"
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
		transition: "none"
	},
}));

const form = {
	rating: 0,
	price: [0, 300],
	date: new Date()
};

const valuePriceText = value => `$${value}`;

const SearchFilter = function() {
	const classes = useStyle();
	const [isDialogOpen, setIsDialogOpen] = useState(true);
	const { values, handleInputChange, setValues, handleDateChange } = useForm(form);

	const handleSliders = (prop) => (e, newValue) => {
		setValues({...values, [prop]: newValue});
	};

	return (
		<Grid container component="form" className={classes.container}>
			<Grid item>
				<SearchIcon className={classes.icon} fontSize="large" />
				<TextField label="Search" />
			</Grid>
			<Fab color="primary" size="small" className={classes.fab} onClick={() => setIsDialogOpen(true)}>
				<AddIcon />
			</Fab>

			{ /*Filters*/ }
			<Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} aria-labelledby="filters-dialog-title">
				<DialogTitle id="filters-dialog-title">Filters</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Ratings
					</DialogContentText>
					<Rating name="sitter-ratings" defaultValue={0} onChange={handleInputChange} values={values.rating} size="large"/>
					<DialogContentText>
						($) Price
					</DialogContentText>
					<Slider min={0} max={300} name="price-range" value={values.price} onChange={handleSliders("price")}  valueLabelDisplay="auto" aria-labelledby="price-slider" getAriaValueText={valuePriceText}/>
					<DialogContentText>
						Availability
					</DialogContentText>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<DateTimePicker label="From" value={values.date} disablePast onChange={handleDateChange} showTodayButton/>
						<DateTimePicker label="To" value={values.date} disablePast onChange={handleDateChange} showTodayButton/>
					</MuiPickersUtilsProvider>
					<DialogContentText>
						Sort By
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</Grid>
	);
}

export default SearchFilter;
