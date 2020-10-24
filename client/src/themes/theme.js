import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
    h2: {
      fontSize: "2em",
      fontWeight: "bold",
      margin: "2em 0",
    },
  },
  palette: {
    primary: {
      main: "#DF1B1B",
      light: "#f04040",
    },
  },
  buttons: {
    bigRedButton: {
      padding: "1.5em 7em",
    },
  },
  boxShadows: {
    main: "0px 0px 26px -5px rgba(0,0,0,0.75)",
  },
});
