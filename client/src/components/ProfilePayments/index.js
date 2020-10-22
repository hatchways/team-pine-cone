import React from 'react';

import { Grid, Typography, Hidden, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	root: { 
		maxWidth: '900px',
		margin: "0 auto",
	},
	title: { 
		textAlign: 'center',
		marginBottom: "4em"
	},
	typing: { 
		fontWeight: '500'
	},
	button: { 
		padding: "1.3em 3em"
	}
}));

const ProfilePayments = function() {
	const classes = useStyles();

	return (
		<Grid direction="column" container className={classes.root}>
			<Grid item>
				<h2 className={classes.title}>Payment Methods</h2>
			</Grid>
			<Grid item>
				<Hidden smDown>
					<Typography className={classes.typing}>
						Saved Payment Profiles
					</Typography>
				</Hidden>
			</Grid>
			<Grid item>
				<Button variant="outlined" size="large" color="primary" className={classes.button}>
					Add new payment profile
				</Button>
			</Grid>
		</Grid>
	);
}

export default ProfilePayments;
