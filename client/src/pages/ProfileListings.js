import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Grid, GridList, Typography, Button } from '@material-ui/core/';
import { Rating } from "@material-ui/lab";
import RoomIcon from "@material-ui/icons/Room";

import profileDetailsStyles from './ProfileDetails';

const useStyle = makeStyles(theme => ({
	root: {  
		flexWrap: "nowrap",
	},
	bold: { 
		fontWeight: 'bold'
	},
	card: { 
      boxShadow: "0px 0px 26px -5px rgba(0,0,0,0.75)",
		padding: "1.5em",
		textAlign: 'center',
	},
	cardBottom: {
		width: '100%',
	},
	avatar: {
		width: "150px",
		height: "150px"
	},
  subtile: {
    color: theme.palette.grey[600],
		fontWeight: 500
  },
	description: {
		fontWeight: 500
	},
	cards: { 
		padding: "2em",
		display: 'grid',
		"grid-template-columns": "repeat(auto-fill, minmax(10rem, 20rem))",
		"justify-content": "center",
		"grid-gap": "5em"
	},
	button: { 
		padding: "1.5em 3em"
	}
}));

const Item = function(props) {
	const {src, firstName, lastName, shortDescription, title, rating, hourlyRate, location} = props;
	const classes = useStyle();
	

	return (
		<Grid item xs={12} className={classes.card}>
			<Grid container spacing={2} direction="column" alignItems="center">
				<Grid item>
					<Avatar className={classes.avatar} src={src} alt={lastName}/>
				</Grid>
				<Grid item>
					<Grid container alignItems="center" direction="column">
						<Grid item>
							<Typography variant="h5" className={classes.bold}>
								{firstName + " " + lastName}
							</Typography>
						</Grid>
						<Grid item>
							  <Typography variant="body1" className={classes.subtile}>
								Loving Cat Sitter
							  </Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Rating value={rating} name="read-only" readOnly />
				</Grid>
				<Grid item>
					<Typography variant="body1" className={classes.description}>
						{ shortDescription }
					</Typography>
				</Grid>
				<Grid item className={classes.cardBottom}>
					<Grid container justify="space-around">
						<Grid item>
							<Grid container spacing={1}>
								<Grid item>
									<RoomIcon color="primary"/>
								</Grid>
								<Grid item>
									<Typography className={classes.subtile}>
										{ location }
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Typography variant="body1" className={classes.bold}>
								{ hourlyRate }
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

const user = { 
	src: 'https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-256.png',
	firstName: "Michael",
	lastName: "Braga",
	rating: 4,
	shortDescription: 'The best cat sitter, walker, talker, over nght hours',
	location: 'Toronto, Ontario',
	hourlyRate: "14$/hr"
}

const users = [user, user, user, user,user,user];

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
				<div className={classes.cards}>
					{ 
						users.map((props, i) => <Item key={props.name + i} {...props}/>)
					}
				</div>
			</Grid>
			<Grid item style={{margin: "2em auto"}}>
				<Button className={classes.button} color="primary" size="large" variant="contained">Show More</Button>			
			</Grid>
		</Grid>
	)

}

export default ProfileListings;
