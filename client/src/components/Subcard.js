import { Card, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  subCard: {
    display: "grid",
    gridAutoColumns: "auto",
    padding: 10,
  },
});

function Subcard(props) {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.subCard}>
        Subcard
    </Card>
  );
}

export default Subcard;
