import React from "react";
import CardDisplay from "react-credit-card-display";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "300px",
    height: "200px",
    borderRadius: "10px",
    padding: "1em",
    boxShadow: theme.boxShadows.main,
    margin: "auto",
    cursor: "pointer",
    background: "rgba(220,220,220, 0.5)",
  },
  text: {
    fontWeight: "500",
    color: theme.palette.grey[500],
  },
  bottomCard: {
    margin: "auto",
  },
}));

const CreditCard = function ({ last4, brand, exp_month, exp_year }) {
  const classes = useStyles();

  const starredNumber = "**** **** **** " + last4;
  const exp = `${exp_month}/${String(exp_year).slice(-2)}`;

  return (
    <Grid direction="column" container className={classes.card}>
      <Grid container justify="space-between">
        <CardDisplay active={brand === "mastercard" ? "mc" : brand} expand />
        <CheckCircle color="primary" fontSize="large" />
      </Grid>
      <Grid item className={classes.bottomCard}>
        <Typography variant="h5" className={classes.text}>
          {starredNumber}
        </Typography>
        <Typography className={classes.text}>Exp. Date {exp}</Typography>
      </Grid>
    </Grid>
  );
};

export default CreditCard;
