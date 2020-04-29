import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "../../axios-table";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(0),
      minWidth: 150,
    },
  })
);

export default function ProductModal(props: any) {
  const [typesData, setTypesData] = useState<string[]>([]);
  const classes = useStyles();

  useEffect(() => {
    axios.get("/types.json").then((response) => {
      setTypesData(response.data["-M65Hl3wNIZ_KwOqZ0_2"]);
    });
  }, []);

  const meniuItems = typesData.map((type) => {
      return (<MenuItem key={type} value={type}>{type}</MenuItem>)
  });

  const handleClose = () => {
    props.callback(false);
  };

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={handleClose}
        aria-labelledby="product-modal"
      >
        <DialogTitle id="product-modal">Fill required data</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="ean"
            label="EAN"
            type="number"
            fullWidth
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="product-type-label">Product type</InputLabel>
            <Select
              labelId="product-type-label"
              id="product-type"
              //   value='Type'
              //   onChange={handleChange}
            >
              {meniuItems}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="weight"
            label="Weight"
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            id="color"
            label="Color"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
