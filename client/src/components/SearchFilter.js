import React from 'react';
import { makeStyles } from "@material-ui/styles/";
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import { Grid, FormControl, InputLabel, Input, InputBase, Button, TextField, Fab } from "@material-ui/core/";

const useStyle = makeStyles(theme => ({
	container: { 
		width: "500px",
		margin: "auto",
		borderRadius: "50px",
	},
	search: { 
		padding: "1em",
		borderRadius: "50px",
		display: "flex",
	},
	icon: { 
		marginRight: "10px",
		background: theme.palette.primary.main,
		fill: "white",
		borderRadius: "50%",
		padding: "0.2em",
	},
	field: { 
		background: "white",
		transition: "all 0.2s",
		color: "white",
		"&:hover": { 
			background: theme.palette.primary.main,
			borderRadius: "50px",
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
	fab: {
		transition: "none"
	}
}));

const SearchFilter = function() {
	const classes = useStyle();

	return (
		<Grid container component="form" className={classes.container}>
			<Grid item className={classes.field}>
				<Grid container alignItems="center" className={classes.search}>
					<SearchIcon className={classes.icon} fontSize="large" />
					<TextField label="Search" />
					<Fab color="primary" size="small" className={classes.fab}>
						<AddIcon />
					</Fab>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default SearchFilter;
