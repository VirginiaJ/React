import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CreateIcon from "@material-ui/icons/Create";
import SearchIcon from "@material-ui/icons/Search";
import ProductModal from "../modal/modal-form";
import axios from "../../axios-table";
import { Data, IProductsData, IProductData } from "./types";
import { IInputsData } from "../modal/types";
import EnhancedTableHead from "./tableHead";
import { EnhancedTableToolbar } from "./tableToolbar";
import { Link } from "react-router-dom";

function createData(
  name: string,
  ean: string,
  type: string,
  weight: string,
  color: string,
  id: string
): Data {
  return { name, ean, type, weight, color, id };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function ProductTable() {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("ean");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [productsData, setProductsData] = useState<IProductsData>({
    products: {},
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");

  useEffect(() => {
    axios.get("/products.json").then((response) => {
      setProductsData({ products: response.data });
    });
  }, []);

  const productsArray: { id: string; product: IProductData }[] = [];
  for (let key in productsData.products) {
    productsArray.push({
      id: key,
      product: productsData.products[key],
    });
  }

  const rows: {
    name: string;
    ean: string;
    type: string;
    weight: string;
    color: string;
    id: string;
  }[] = [];

  productsArray.map((item) => {
    rows.push(
      createData(
        item.product.name,
        item.product.ean,
        item.product.type,
        item.product.weight,
        item.product.color,
        item.id
      )
    );
  });

  const handleModal = () => {
    setOpenModal(!openModal);
    setEditId("");
  };

  const handleDelete = () => {
    for (let i = 0; i < selected.length; i++) {
      axios.delete("/products/" + selected[i] + ".json");
      delete productsData.products[selected[i]];
    }
    setSelected([]);
  };

  const handleEdit = (id: string) => {
    setEditId(id);
    setOpenModal(true);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleNewData = (inputsData: IInputsData, id: string) => {
    setOpenModal(!openModal);
    const updatedProducts = { ...productsData.products, [id]: inputsData };
    setProductsData({ products: updatedProducts });
  };

  const handleEditData = (inputsData: IInputsData) => {
    setOpenModal(!openModal);
    const editedProducts = { ...productsData.products, [editId]: inputsData };
    setProductsData({ products: editedProducts });
    setEditId("");
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          modalCallBack={handleModal}
          delete={handleDelete}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.ean}</TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">{row.weight}</TableCell>
                      <TableCell align="center">{row.color}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Preview item">
                          <Link to={"/product/" + row.id}>
                            <IconButton aria-label="preview item">
                              <SearchIcon />
                            </IconButton>
                          </Link>
                        </Tooltip>
                        <Tooltip title="Edit item">
                          <IconButton
                            aria-label="edit item"
                            onClick={() => handleEdit(row.id)}
                          >
                            <CreateIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <ProductModal
          isOpen={openModal}
          modalCallBack={handleModal}
          newCallBack={handleNewData}
          editCallBack={handleEditData}
          itemToEdit={productsData.products[editId]}
          itemToEditId={editId}
        />
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);
