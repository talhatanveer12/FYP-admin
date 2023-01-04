import React, { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useGetAdminsQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { getUserAdmin } from "store/Admin/adminAction";
import axiosInstance from "Http-Request/axios-instance";
import Swal from "sweetalert2";

const Admin = () => {
  const theme = useTheme();
  //const { data, isLoading } = useGetAdminsQuery();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const { adminUser } = useSelector((state) => state.Admin);

  //const [category, setCategory] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setData = (name, _id, role, occupation, email, phoneNumber) => {
    setName(name);
    setEmail(email);
    setRole(role);
    setOccupation(occupation);
    setPhone(phoneNumber);
    setEditOpen(true);
    setId(_id);
  };

  const submitHandle = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("role", role);
    data.append("password", password);
    data.append("phoneNumber", phone);
    data.append("occupation", occupation);
    const response = await axiosInstance.post("/auth/register", data);
    if (response.status === 200) {
      setOpen(false);
      Swal.fire({
        text: "Create Admin User Successfully",
        icon: "success",
      });
      dispatch(getUserAdmin());
      setName('');
      setEmail('');
      setPhone('');
      setOccupation("");
      setRole("");
    }
  };

  const deleteHandle = async (_id) => {
    const response = await axiosInstance.delete(`/auth/delete/${_id}`);
    if (response.status === 200) {
      setOpen(false);
      Swal.fire({
        text: "Delete Admin User Successfully",
        icon: "success",
      });
      dispatch(getUserAdmin());
    }
  };

  const submitEditHandle = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("role", role);
    data.append("phoneNumber", phone);
    data.append("occupation", occupation);
    const response = await axiosInstance.post(`/auth/update/${id}`,data);
    if (response.status === 200) {
      setEditOpen(false);
      Swal.fire({
        text: "Delete Admin User Successfully",
        icon: "success",
      });
      dispatch(getUserAdmin());
      // setName('');
      // setEmail('');
      // setPhone('');
      // setOccupation("");
      // setRole("");
    }

    
  };

  useEffect(() => {
    dispatch(getUserAdmin());
  }, [dispatch]);

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
      renderCell: (params) => {
        return params.value === "sale_manager" ? "Sale Manager" : params.value;
      },
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
                setData(
                  params.row.name,
                  params.row._id,
                  params.row.role,
                  params.row.occupation,
                  params.row.email,
                  params.row.phoneNumber
                );
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteHandle(params.row._id);
              }}
            >
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
          <Header
            title="ADMINS"
            subtitle="Managing admins and list of admins"
          />
          <Button
            variant="contained"
            color="success"
            size="small"
            sx={{ fontWeight: "bold", height: "45px" }}
            onClick={handleClickOpen}
          >
            Add User
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
            loading={!adminUser}
            getRowId={(row) => row._id}
            rows={adminUser || []}
            columns={columns}
            // components={{
            //   ColumnMenu: CustomColumnMenu,
            // }}
          />
        </Box>
      </Box>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add User</DialogTitle>
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
            <FormControl variant="standard" fullWidth sx={{ mt: "2px" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                //value={age}
                fullWidth
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                //onChange={handleChange}
                label="Role"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="sale_manager">Sale Manager</MenuItem>
                <MenuItem value="accountant">Accountant</MenuItem>
              </Select>
            </FormControl>
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
            <TextField
              autoFocus
              margin="dense"
              id="Password"
              label="Password"
              type="text"
              fullWidth
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
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
      <div>
        <Dialog
          open={editOpen}
          onClose={() => {
            setEditOpen(true);
          }}
        >
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
              id="emailyy"
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
            <FormControl variant="standard" fullWidth sx={{ mt: "2px" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                //value={age}
                fullWidth
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                //onChange={handleChange}
                label="Role"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="sale_manager">Sale Manager</MenuItem>
                <MenuItem value="accountant">Accountant</MenuItem>
              </Select>
            </FormControl>
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
            <Button
              onClick={() => {
                setEditOpen(false);
              }}
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
            <Button
              onClick={submitEditHandle}
              variant="contained"
              color="success"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Admin;
