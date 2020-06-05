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
import { IInputsData } from "./types";

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
  const [inputsData, setInputsData] = useState<IInputsData>({
    name: "",
    ean: "",
    type: "",
    weight: "",
    color: "",
  });
  const classes = useStyles();

  useEffect(() => {
    axios.get("/types.json").then((response) => {
      setTypesData(response.data["-M65Hl3wNIZ_KwOqZ0_2"]);
    });
  }, []);

  const meniuItems = typesData.map((type) => {
    return (
      <MenuItem key={type} value={type}>
        {type}
      </MenuItem>
    );
  });

  const handleClose = () => {
    props.callback(false);
  };

  const handleChange = (event: any) => {
    const { target } = event;
    const newInputsData = { ...inputsData };
    let key: "name" | "ean" | "type" | "weight" | "color";
    for (key in inputsData) {
      if (target.id === key) {
        newInputsData[key] = target.value;
      }
    }
    setInputsData(newInputsData);
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: string }>) => {
    setInputsData({
      ...inputsData,
      ["type"]: event.target.value,
    });
  };

  const handleSave = () => {
    axios.post("/products.json", inputsData).then((response) => {
      const id = response.data.name;
      props.callback(inputsData, id);
    });
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
            onChange={(event: any) => handleChange(event)}
          />
          <TextField
            margin="dense"
            id="ean"
            label="EAN"
            type="number"
            fullWidth
            onChange={(event: any) => handleChange(event)}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="product-type-label">Product type</InputLabel>
            <Select
              labelId="product-type-label"
              id="product-type"
              onChange={handleSelectChange}
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
            onChange={(event: any) => handleChange(event)}
          />
          <TextField
            margin="dense"
            id="color"
            label="Color"
            type="text"
            fullWidth
            onChange={(event: any) => handleChange(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
