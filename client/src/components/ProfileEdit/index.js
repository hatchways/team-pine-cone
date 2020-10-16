import React, { useState } from 'react';
import { 
	Grid,
	Typography,
	TextField,
	MenuItem,
	Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { months, genders } from './data';

const useStyles = makeStyles(theme => ({
	label: { 
		fontWeight: 'bold',
		letterSpacing: '0.7px',
		cursor: 'pointer',
		padding: '1.5em',
		display: 'block',
		textAlign: 'right'
	},
	mainContainer: { 
		margin: 'auto',
		maxWidth: '900px'
	},
	input: { 
		marginBottom: '1em',
	},
	select: { 
		width: "100%",
	},
	button: { 
		textTransform: 'none',
		fontWeight: 'bold'
	},
	bigRedButton: { 
		...theme.buttons.bigRedButton,
		marginTop: '2.5em'
	}
}));

const InputText = function({ id, placeholder, children, handleChange }) {
	const classes = useStyles();

	return (
		<Grid container item className={ classes.input }>
			<Grid item xs={ 4 }>
				<Typography
					className={ classes.label }
					component="label" 
					htmlFor={ id }>
					{ children }
				</Typography>
			</Grid>
			<Grid item xs={ 6 }>
				<TextField 
					onChange={ handleChange }
					id={ id } 
					variant="outlined" 
					fullWidth
					placeholder={ placeholder }/>
			</Grid>
		</Grid>
	);
}

const Label = function({children, id}) { 
	const classes = useStyles();

	return (
		<Typography
			className={ classes.label }
			component="label" 
			htmlFor={ id }>
			{ children }
		</Typography>
	);
}

const ProfileEdit = function() {
	const classes = useStyles();
	const [form, setForm] = useState({});

	const handleText = formProp => e => { 
		setForm({ ...form, [formProp]: e.currentTarget.value });
	};

	console.log(genders);

	return (
		<Grid component="form" className={ classes.mainContainer } container direction="column" alignItems="center">
			<Grid item>
				<Typography variant="h2">Edit Profile</Typography>
			</Grid>
			<InputText
				id="first-name" 
				placeholder="John"
				handleChange={ handleText('firstName') }
			>
				FIRST NAME
			</InputText>
			<InputText 
				id="last-name" 
				placeholder="John"
				handleChange={ handleText('lastName') }
			>
				LAST NAME
			</InputText>
			<Grid container item className={ classes.input }>
				<Grid item xs={ 4 }>
					<Label id="gender">
						GENDER
					</Label>
				</Grid>
				<Grid item xs={ 3 }>
					<TextField
						id="gender"
						select
						value=""
						onClose={ handleText('gender')}
						className={ classes.select }
						variant="outlined"
					>
						{ 
							genders.map(value => (
								<MenuItem 
									key={ value }
									select="Male"
								>
									{ value }
								</MenuItem>
							))
						}
					</TextField>
				</Grid>
			</Grid>
			<Grid container item>
				<Grid item xs={ 4 }>
					<Label>BIRTH DATE</Label>
				</Grid>
				<Grid container justify="space-between" item xs={ 6 }>
					<Grid item  xs={ 5 }>
						<TextField
							id="gender"
							value="Male"
							select
							className={ classes.select }
							variant="outlined">
							<MenuItem>Male</MenuItem>
						</TextField>
					</Grid>
					<Grid item xs={ 3 }>
						<TextField
							id="gender"
							value="Male"
							select
							className={ classes.select }
							variant="outlined">
							<MenuItem>Male</MenuItem>
						</TextField>
					</Grid>
					<Grid item xs={ 3 }>
						<TextField
							id="gender"
							value="Male"
							select
							className={ classes.select }
							variant="outlined">
							<MenuItem>Male</MenuItem>
						</TextField>
					</Grid>
				</Grid>
			</Grid>
			<InputText 
				id="email" 
				placeholder="john-doe@gamil.com"
				handleChange={ handleText('email') }
			>
				EMAIL ADDRESS
			</InputText>
			<Grid container item className={ classes.input }>
				<Grid item xs={ 4 }>
					<Label id="phone">PHONE NUMBER</Label>
				</Grid>
				<Grid  container alignItems="center" item xs={ 6 } >
					<Grid 
						container 
						item 
						alignItems="center" 
						justify="space-between"
					>
						<Grid item>
							<Typography
								component="i">
								No Phone Number Entered
						</Typography>
						</Grid>
						<Grid item>
							<Button 
								variant="outlined"
								className={ classes.button }
								color="primary"
							>
								Add a phone number
						</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<InputText 
				id="address" 
				placeholder="Address"
				handleChange={ handleText('address') }
			>
				WHERE YOU LIVE
			</InputText>
			<Grid item container className={ classes.input }>
				<Grid item xs={ 4 }>
					<Label id="description">DESCRIBE YOURSELF</Label>
				</Grid>
				<Grid item xs={ 6 }>
					<TextField
						multiline
						fullWidth
						rows={ 6 }
						variant="outlined"
						placeholder="About you"
						onChange={ handleText('description') }
					/>
				</Grid>
			</Grid>
			<Grid item xs={ 12 }>
				<Button variant="contained" color="primary" size="large" className={ classes.bigRedButton }>
					Save
				</Button>
			</Grid>
		</Grid>
	);
}

export default ProfileEdit;
