import React, { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCustomersQuery, useGetInvoicesQuery, useGetProductsQuery, useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import axiosInstance from "Http-Request/axios-instance";
import { useDispatch, useSelector } from "react-redux";
import { getUserInvoice } from "store/Admin/adminAction";
import moment from "moment";

const Invoice = () => {
  const theme = useTheme();
  const [userId, setUserId] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [quantity, setQuantity] = useState();
  const [products, setProducts] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {invoice} = useSelector((state) => state.Admin);

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetInvoicesQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const result = useGetCustomersQuery();
  const resutl1 = useGetProductsQuery();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandle = async () => {
    const getProduct = resutl1.data.filter((item) => item._id === products);
    if(parseInt(quantity) > getProduct[0]?.supply){
      setOpen(false);
      Swal.fire({
        text: "Please Enter Valid Item (i.e item not greater than total product stock)",
        icon: "error",
      });
      return;
    }
    else if(parseInt(quantity) < 0 ) {
      setOpen(false);
      Swal.fire({
        text: "Please Enter Valid Item (item greater than 0)",
        icon: "error",
      });
      return;
    }
    else {
      const Total = parseInt(quantity) * getProduct[0]?.price
      const data = new FormData();
      data.append("quantity", quantity);
      data.append("totalAmount", Total);
      data.append("userId", userId);
      data.append("products", products);
      const response = await axiosInstance.post(`/client/invoice`, data);
      if (response.status === 200) {
        setOpen(false);
        Swal.fire({
          text: "Create Invoice Successfully",
          icon: "success",
        });
        dispatch(getUserInvoice());
        setQuantity();
        setUserId();
        setProducts();
      }
    }
    

  };

  useEffect(() => {
    dispatch(getUserInvoice());
  } ,[dispatch]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "products",
      headerName: "Product ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      renderCell: (params) => moment(params.value).format('DD MMM YYYY'),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.5,
      sortable: false,
      //renderCell: (params) => params.value.length,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 1,
      renderCell: (params) => `${Number(params.value).toFixed(2)} RS`,
    },
  ];

  return (
    <>
    <Box m="1.5rem 2.5rem">
      
      <Box display="flex" justifyContent="space-between">
      <Header title="INVOICE" subtitle="Entire list of invoice" />
          <Button
            variant="contained"
            color="success"
            size="small"
            sx={{ fontWeight: "bold", height: "45px" }}
            onClick={handleClickOpen}
          >
            Create Invoice
          </Button>
        </Box>
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={!invoice}
          getRowId={(row) => row._id}
          rows={invoice || []}
          columns={columns}
          // rowCount={(data && data.total) || 0}
          // rowsPerPageOptions={[20, 50, 100]}
          // pagination
          // page={page}
          // pageSize={pageSize}
          // paginationMode="server"
          // sortingMode="server"
          // onPageChange={(newPage) => setPage(newPage)}
          // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          // components={{ Toolbar: DataGridCustomToolbar }}
          // componentsProps={{
          //   toolbar: { searchInput, setSearchInput, setSearch },
          // }}
        />
      </Box>
    </Box>
    <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Invoice</DialogTitle>
          <DialogContent>
            <FormControl variant="standard" fullWidth sx={{ mt: "2px" }}>
              <InputLabel id="demo-simple-select-standard-label">
                User
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                //value={age}
                fullWidth
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                //onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {result.data?.length > 0 &&
                  result.data.map((item) => {
                    return <MenuItem value={item._id}>{item.name}</MenuItem>;
                  })}
              </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth sx={{ mt: "5px" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Product
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                //value={age}
                fullWidth
                value={products}
                onChange={(e) => {
                  setProducts(e.target.value);
                }}
                //onChange={handleChange}
                label="Product"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {resutl1.data?.length > 0 &&
                  resutl1.data.map((item) => {
                    return <MenuItem value={item._id}>{item.name}</MenuItem>;
                  })}
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="No of Item"
              type="number"
              inputProps={{ min: 1 }}
              fullWidth
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancel
            </Button>
            <Button onClick={submitHandle} variant="contained" color="success">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Invoice;
