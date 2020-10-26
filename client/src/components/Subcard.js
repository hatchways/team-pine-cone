import { Avatar, Button, Card, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  subCard: {
    display: "grid",
    gridAutoColumns: "auto",
    gridAutoRows: "auto",
    padding: 20,
    alignItems: "center",
    textAlign: "left"
  },
  photo: {
      gridColumn: "1 / span 1",
      marginLeft: 0
  },
  name: {
      gridColumn: "2 / span 1"
  },
  cost: {
      gridColumn: "3 / span 1"
  },
  date: {
    gridColumn: "4 / span 1"
  },
  button1: {
      gridColumn: "5 / span 1",
      marginLeft: 10
  },
  button2: {
      gridColumn: "6 / span 1",
      marginLeft: 10
  } 
});

const formatDate = date => (
    `${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
)

function Subcard({ isBooking, photoSrc, name, cost, start, end }) {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.subCard}>
      <Avatar src={photoSrc} className={classes.photo} />
      <h2 className={classes.name}>{name}</h2>
      <h4 className={classes.cost}>${cost}</h4>
      <h3 className={classes.date}>{formatDate(start)} - {formatDate(end)}</h3>
      <Button color="primary" variant="contained" className={classes.button1}>
        {isBooking ? "Message" : "Accept"}
      </Button>
      <Button color="primary" variant="contained" className={classes.button2}>
        {isBooking ? "Cancel" : "Decline"}
      </Button>
    </Card>
  );
}

export default Subcard;
