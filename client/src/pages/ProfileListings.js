import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Card } from '@material-ui/core/';

import profileDetailsStyles from './ProfileDetails';

const useStyle = makeStyles(theme => ({
	root: {  
		overflow: "hidden",
		borderRadius: "10px",
		maxWidth: "1500px",
		width: "95%",
		margin: "6em auto",
	},
	bold: { 
		fontWeight: 'bold'
	}
}));

const ProfileListings = function() {
	const classes = useStyle();

	return (
		<Grid container direction="column" className={classes.root}>
			<Grid item>
				<Typography className={ classes.bold } variant="h3" align="center">
					Your search results
				</Typography>
			</Grid>
			<Grid item>
				<Grid container>
					<Grid item xs={4}>
						<Card></Card>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)

}

export default ProfileListings;
