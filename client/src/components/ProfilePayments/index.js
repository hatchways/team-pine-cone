import React, { useState, useRef } from 'react';
import { Box, Zoom, Hidden, Button, Fade, TextField, Input, Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";

const useStyles = makeStyles(theme => ({
	root: { 
		maxWidth: '900px',
		margin: "0 auto",
	},
	title: { 
		textAlign: 'center',
		marginBottom: "2em"
	},
	typing: { 
		fontWeight: '500'
	},
	button: { 
		padding: "1.3em 3em",
		textAlign: 'center',
		display: "block",
		margin: "auto"
	},
	form: {
		maxWidth: "500px",
		margin: "0 auto"
	},
	field: {
		marginBottom: "0.5em"
	},
	smallButton: {  
		margin: "1em",
	},
	input: {  
		background: theme.palette.grey[200],
		padding: "1em",
		borderRadius: "0.5em",
		border: `1px solid ${theme.palette.grey[400]}`
	},
}));

const cardOptions = {
      style: {
        base: {
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        }
      }
    }

const ProfilePayments = function() {
	const classes = useStyles();
	const stripe = useStripe();
	const element = useElements();
	const [addingCard, setAddingCard] = useState(false);

	const handleSubmit = e => {
		e.preventDefaults();
	};

	return (
		<div>
			<h2 className={classes.title}>Payment Methods</h2>
			<Fade in={addingCard}>
				<form className={classes.form} onSubmit={handleSubmit}>
					<div className={classes.field}>
						<label htmlFor="card-number">
							<Typography variant="h6" gutterBottom>
								Card Number
							</Typography>
						</label>
						<div className={classes.input}>
							<CardNumberElement options={cardOptions} id="card-number"/>
						</div>
					</div>
					<div className={classes.field}>
						<label htmlFor="expiraton-date">
							<Typography variant="h6" gutterBottom>
								Expiration Date
							</Typography>
						</label>
						<div className={classes.input}>
							<CardExpiryElement options={cardOptions} id="expiraton-date"/>
						</div>
					</div>
					<div className={classes.field}>
						<label htmlFor="cvc">
							<Typography variant="h6" gutterBottom>
								CVC
							</Typography>
						</label>
						<div className={classes.input}>
							<CardCvcElement options={cardOptions} id="cvc"/>
						</div>
					</div>
					<Button type="submit" className={classes.smallButton} variant="outlined" size="small" color="primary">Add Card</Button>
				</form>
			</Fade>
			<Zoom in={!addingCard}>
				<Button variant="outlined" size="large" color="primary" className={classes.button} onClick={() => setAddingCard(true)}>
					Add new payment profile
				</Button>
			</Zoom>
		</div>
	);
}

export default ProfilePayments;
