import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Fade,
  Grid,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import StripeInput from "./StripeInput";
import Card from "./Card";
import { useUserContext } from "../../contexts/user";
import { useFetch } from "../../hooks/useFetch";
import Snackbar from "../DefaultSnackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
  },
  typing: {
    fontWeight: "500",
  },
  button: {
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
    display: "grid",
    position: "relative",
  },
  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
  lightGreen: {
    fill: theme.palette.success.light,
  },
  rel: {
    position: "relative",
  },
}));

const cardErrorMessage =
  "Your credit card may be invalid or could not be processed at this time.";

const ProfilePayments = function () {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUserContext();

  const [
    { data: cards },
    loadingCard,
    error,
    setCards,
    setLoading,
    setError,
  ] = useFetch({
    init: { data: [] },
    url: "/payment/methods/",
  });
  const [, loadingAccount, errorAccount] = useFetch({
    init: null,
    url: `/payment/account/validate/${user.profile}`,
  });
  const [addingCard, setAddingCard] = useState(false);

  const loading = loadingCard || loadingAccount;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (error) setError(null);
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);

    stripe
      .createPaymentMethod({
        type: "card",
        card: cardElement,
      })
      .then((data) => {
        if (data.error) return setError(cardErrorMessage);

        setLoading(true);

        fetch("/payment/methods", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user._id,
            card_id: data.paymentMethod.id,
          }),
        })
          .then((res) => {
            if (!res.ok) throw res;
            return res.json();
          })
          .then((profile) => {
            setAddingCard(false);
            //when adding more then one card spread the array here
            setCards({ data: [data.paymentMethod] });
          })
          .catch(() => setError(cardErrorMessage))
          .finally(() => setLoading(false));
      });
  };

  const handleCreateStripeAccount = (e) => {
    e.preventDefault();
    if (error) setError(null);

    setLoading(true);

    fetch("/payment/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ accountLink }) => (window.location.href = accountLink))
      .catch(() => {
        setError("Could not create Stripe link.");
        setLoading(false);
      });
  };

  return (
    <Grid container direction="column">
      <h2 className={classes.title}>Payment Methods</h2>

      <div className={classes.form}>
        <Typography variant="h6">
          To receive or payout payments complete the following:
        </Typography>
        <List dense={true}>
          <ListItem>
            <ListItemIcon className={classes.rel}>
              <ListItemIcon>
                {!loadingAccount && !errorAccount ? (
                  <CheckIcon className={classes.lightGreen} />
                ) : (
                  <ClearIcon color="primary" />
                )}
              </ListItemIcon>
              <ListItemText primary="Link your account with Stripe" />
            </ListItemIcon>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ListItemIcon>
                {!loadingCard && cards.length > 0 ? (
                  <CheckIcon className={classes.lightGreen} />
                ) : (
                  <ClearIcon color="primary" />
                )}
              </ListItemIcon>
              <ListItemText primary="Add a payment method" />
            </ListItemIcon>
          </ListItem>
        </List>
      </div>

      <div className={classes.container}>
        {error && <Snackbar open={!!error} message={error} />}

        {loading && <CircularProgress className={classes.loader} />}

        {/*FORM*/}
        {cards.length > 0 && !addingCard && !loading ? (
          cards.map((data) => <Card key={data.id} {...data.card} />)
        ) : (
          <Fade in={addingCard && !loading}>
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
                disabled={loading}
              >
                Add Card
              </Button>
              <Button
                type="button"
                className={classes.smallButton}
                variant="outlined"
                size="small"
                color="primary"
                disabled={loading}
                onClick={() => setAddingCard(false)}
              >
                Cancel
              </Button>
            </form>
          </Fade>
        )}
      </div>

      {/*BUTTON*/}
      <Fade in={!addingCard}>
        <ButtonGroup
          style={{ margin: "auto" }}
          variant="outlined"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button disabled={loading} onClick={handleCreateStripeAccount}>
            {errorAccount
              ? "Link your account with Stripe"
              : "Update your account with Stripe"}
          </Button>
          <Button disabled={loading} onClick={() => setAddingCard(true)}>
            {cards.length > 0
              ? "Change payment profile"
              : "Add new payment profile"}
          </Button>
        </ButtonGroup>
      </Fade>
    </Grid>
  );
};

export default ProfilePayments;
