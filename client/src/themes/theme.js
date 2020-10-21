import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "\"Roboto\"",
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
	},
	h2: { 
		fontSize: '2em',
		fontWeight: 'bold',
		margin: '2em 0'
	},
  },
  palette: {
    primary: { main: "#DF1B1B" }
  },
	buttons: { 
		bigRedButton: { 
			padding: '1.5em 7em'
		}
	}
});
