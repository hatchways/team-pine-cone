import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Grid, Card, Typography, Link } from '@material-ui/core/';
import { makeStyles } from "@material-ui/core/styles";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import PetsIcon from '@material-ui/icons/Pets';

const useStyles = makeStyles(() => ({
	container: {
		position: "fixed",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		border: "grey 1px solid",
		borderRadius: "10px",
		margin: "auto",
		maxWidth: "900px",
		height: "500px",
		background: "white",
	},
	icon: { 
		marginLeft: "1em",
	},
	dog: { 
		width: "5em",
		height: "5em",
	},
	body: { 
		maxWidth: "300px"
	}
}));

const PaymentSuccess = function() {
	const classes = useStyles();

	return (
		<Grid container spacing={ 8 } alignItems="center" direction="column" className={classes.container}>
			<Grid container justify="center" alignItems="center">
				<h2>Payment was successful!</h2>
				<ThumbUpIcon className={classes.icon} color="primary" fontSize="large"/>
			</Grid>
			<Grid item>
				<PetsIcon fontSize="large" color="primary" className={classes.dog}/>
			</Grid>
			<Typography color="textSecondary" className={classes.body}>
				Thanks for choosing LovingSitter as your number one service provider, for last minute dog sitting and dog services!
			</Typography>
			<Grid item>
				<Link component={RouteLink} to="/me">
					Return To Profile
				</Link>
			</Grid>
		</Grid>
	);
}

export default PaymentSuccess;
