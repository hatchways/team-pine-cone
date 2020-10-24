import React from "react";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import StripeInput from './StripeInput';

const useStyles = makeStyles(theme => ({

}));

const Form = function () {
	const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.field}>
        <StripeInput Component={CardNumberElement} label="Card Number" />
      </div>
      <div className={classes.field}>
        <StripeInput Component={CardExpiryElement} label="Expiration Date" />
      </div>
      <div className={classes.field}>
        <StripeInput Component={CardCvcElement} label="CVC" />
      </div>
      <Button
        type="submit"
        className={classes.smallButton}
        variant="outlined"
        size="small"
        color="primary"
      >
        Add Card
      </Button>
    </form>
  );
};

export default Form;
