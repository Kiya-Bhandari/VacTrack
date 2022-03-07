import * as React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  close: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  undo: {
    color: "#88b2f5",
    fontWeight: "bold",
    textTransform: "none",
  },
  //   success: {
  //     color: "#155724",
  //     backgroundColor: "#d4edda",
  //     borderColor: "#c3e6cb",
  //   },
  //   error: {
  //     color: "#721c24",
  //     backgroundColor: "#f8d7da",
  //     borderColor: "#f5c6cb",
  //   },
}));

const PositionedSnackbar = ({
  horizontalPosition,
  verticalPosition,
  message,
  openSnackbar,
  handleCloseSnackbar,
  undo,
  handleUndo,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: verticalPosition,
          horizontal: horizontalPosition,
        }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={message}
        action={
          <>
            {undo ? (
              <Button
                className={classes.undo}
                size="small"
                onClick={handleUndo}
              >
                Undo
              </Button>
            ) : null}

            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          </>
        }
      />
    </div>
  );
};

export default PositionedSnackbar;
