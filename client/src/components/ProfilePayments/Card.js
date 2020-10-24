import React from 'react';
import CardDisplay from 'react-credit-card-display';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	card: { 
		width: "300px",
		height: "200px",
		borderRadius: "10px",
		padding: "1em",
		boxShadow: theme.boxShadows.main,
		margin: "0 auto"
	},
	text: { 
		fontWeight: "500",
		color: theme.palette.grey[500]
	},
	bottomCard: { 
		margin: 'auto'
	}
}));

const CreditCard = function({ last4 = "1234", active = "visa", exp = "12/24" }) {
	const classes = useStyles();

	const starredNumber = "**** **** **** " + last4;

	return (
		<Grid direction="column" container className={classes.card}>
			<Grid container justify="space-between">
				<CardDisplay  active={active} expand/>
				<CheckCircle color="primary" fontSize="large"/>
			</Grid>
			<Grid item className={ classes.bottomCard }>
				<Typography variant="h5" className={classes.text}>
					{ starredNumber }
				</Typography>
				<Typography className={ classes.text }>
					Exp. Date { exp }
				</Typography>
			</Grid>
		</Grid>
	);
}

export default CreditCard;
