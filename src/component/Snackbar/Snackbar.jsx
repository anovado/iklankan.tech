import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export const AlerSnackbar = (props) => {

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.hideAlert()
    };

    return(
        <React.Fragment>
            <Snackbar open={props.alert.show} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={props.hideAlert} severity={props.alert.type}>
                {props.alert.message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}