import React, { useState } from "react";
import { Zoom, Button, Fade, Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import StripeInput from "./StripeInput";
import Card from "./Card";
import Snackbar from "../DefaultSnackbar";
import { useUserContext } from "../../contexts/user";
import { useFetch } from "../../hooks/useFetch";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "2em",
  },
  typing: {
    fontWeight: "500",
  },
  button: {
    padding: "1.3em 3em",
    textAlign: "center",
    display: "block",
    margin: "auto",
  },
  form: {
    maxWidth: "500px",
    width: "100%",
    margin: "0 auto",
  },
  field: {
    marginBottom: "2em",
  },
  smallButton: {
    margin: "1em",
  },
  input: {
    background: theme.palette.grey[200],
    padding: "1em",
    borderRadius: "0.5em",
    border: `1px solid ${theme.palette.grey[400]}`,
  },
  container: {
    minHeight: "300px",
	  position: "relative"
  },
	loader: { 
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		margin: "auto"
	}
}));

const ProfilePayments = function () {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUserContext();
  const [{ data: cards }, loading, error, setCards] = useFetch({
    init: { data: [] },
    url: `/payment/payment_methods/${user.profile}`,
  });
  const [cardData, setCardData] = useState(null);
  const [addingCard, setAddingCard] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);

    stripe
      .createPaymentMethod({
        type: "card",
        card: cardElement,
      })
      .then((data) => {
        if (data.error) return;
		  console.log(data)

        fetch("/payment/payment_methods", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user._id,
            card_id: data.paymentMethod.id,
          }),
        })
          .then((res) => res.json())
        setAddingCard(false);
        setCards({ data: [...cards, data.paymentMethod]});
      });
  };

  return (
    <Grid container direction="column">
      <h2 className={classes.title}>Payment Methods</h2>
      <div className={classes.container}>
		  { loading && <CircularProgress className={classes.loader} /> }
        {cards.length > 0 && !addingCard ? (
          cards.map(data => <Card key={data.id} {...data.card} />)
        ) : (
          <Fade in={addingCard}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <div className={classes.field}>
                <StripeInput
                  Component={CardNumberElement}
                  label="Card Number"
                />
              </div>
              <div className={classes.field}>
                <StripeInput
                  Component={CardExpiryElement}
                  label="Expiration Date"
                />
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
              <Button
                type="button"
                className={classes.smallButton}
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => setAddingCard(false)}
              >
                Cancel
              </Button>
            </form>
          </Fade>
        )}
      </div>
      <Zoom in={!addingCard}>
        <Button
          variant="outlined"
          size="large"
          color="primary"
			disabled={ loading }
          className={classes.button}
          onClick={() => setAddingCard(true)}
        >
          {cards.length > 0
            ? "Change payment profile"
            : "Add new payment profile"}
        </Button>
      </Zoom>
    </Grid>
  );
};

export default ProfilePayments;
