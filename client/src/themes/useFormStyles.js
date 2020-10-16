import { makeStyles } from "@material-ui/core/styles";

export default useFormStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: "#DF1B1B",
    fontSize: "0.75rem",
    fontFamily: "Roboto",
    fontWeight: 400,
    lineHeight: 1.43,
    textDecoration: "none",
  },
}));
