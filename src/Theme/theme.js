import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const themeApp = createTheme({

    palette: {
        primary: {
            main: '#394A64'
        },
        secondary: {
            main: '#543884'
        },
        error: {
            main: red.A400
        }
    }
});