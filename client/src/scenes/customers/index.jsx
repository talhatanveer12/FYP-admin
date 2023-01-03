import React,{useState} from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";


const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");
  const [id,setId] = useState('');
  //const [category, setCategory] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setData = (name, _id, occupation, email, phoneNumber) => {
    setName(name);
    setEmail(email);
    setOccupation(occupation);
    setPhone(phoneNumber);
    setEditOpen(true);
    setId(_id);
  };

  const submitHandle = async () => {
    const prod = { name, email, role: "user", password: "12345678", phoneNumber: phone, occupation };
    const response = await fetch("http://localhost:5001/auth/register", {
      method: "POST",
      body: JSON.stringify(prod),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setOpen(false);
  }

  const deleteHandle = async (_id) => {
    const response = await fetch(
      `http://localhost:5001/auth/delete/${_id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const submitEditHandle = async () => {
    const prod = { name, email, phoneNumber: phone, occupation };
    const response = await fetch(`http://localhost:5001/auth/update/${id}`, {
      method: "POST",
      body: JSON.stringify(prod),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setEditOpen(false);
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "_id",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginRight: "4px" }}
              onClick={() => {
              setData(params.row.name, params.row._id, params.row.occupation, params.row.email, params.row.phoneNumber);
            }}
            >
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={() => {deleteHandle(params.row._id)}}>
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
    <Box m="1.5rem 2.5rem">
      
      <Box display="flex" justifyContent="space-between">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
        <Button
          variant="contained"
          color="success"
          size="small"
          sx={{ fontWeight: "bold", height: "45px" }}
          onClick={handleClickOpen}
        >
          Add Customer
        </Button>
      </Box>
      <Box
        mt="40px"
        height="75vh"
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
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
    <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              //onChange= )
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="Phone Number"
              type="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="occupation"
              label="Occupation"
              type="text"
              fullWidth
              value={occupation}
              onChange={(e) => {
                setOccupation(e.target.value);
              }}
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
            <Button onClick={submitHandle} variant="contained" color="success">Create</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog open={editOpen} onClose={() => {setEditOpen(true)}}>
          <DialogTitle>Update User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              //onChange= )
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="Phone Number"
              type="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="occupation"
              label="Occupation"
              type="text"
              fullWidth
              value={occupation}
              onChange={(e) => {
                setOccupation(e.target.value);
              }}
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {setEditOpen(false)}} variant="contained" color="error">Cancel</Button>
            <Button onClick={submitEditHandle} variant="contained" color="success">Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Customers;
