import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import Header from "components/Header";
import {
  useGetProductsQuery,
  useGetCategorysQuery,
  useGetBrandsQuery,
  useCreateProductsQuery,
} from "state/api";
import { useEffect } from "react";
import axios from "axios";
import { axiosFileInstance } from "Http-Request/axios-instance";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
  productImage
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [p_name, setName] = useState("");
  const [p_description, setDescription] = useState("");
  const [brands, setBrand] = useState("");
  const [p_category, setCategory] = useState("");
  const [p_stock, setStock] = useState(0);
  const [p_price, setPrice] = useState(0);

  const result = useGetCategorysQuery();
  const brand = useGetBrandsQuery();

  //const [category, setCategory] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submitHandle = async () => {
    console.log({
      p_name,
      p_description,
      p_category,
      brands,
      p_stock,
      p_price,
    });
    const prod = {
      name: p_name,
      description: p_description,
      category: p_category,
      brands: brands,
      stock: p_stock,
      price: p_price,
    };
    const response = await fetch(
      `http://localhost:5001/client/products/${id}`,
      {
        method: "POST",
        body: JSON.stringify(prod),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setOpen(false);
  };

  const deleteHandle = async (_id) => {
    const response = await fetch(
      `http://localhost:5001/client/products/${_id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const setData = (name, _id, description, price, category, supply) => {
    setName(name);
    setCategory(category);
    setPrice(price);
    setDescription(description);
    setStock(supply);
    setOpen(true);
    setId(_id);
  };

  return (
    <>
      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                sx={{ fontSize: 14 }}
                color={theme.palette.secondary[700]}
                gutterBottom
              >
                {category}
              </Typography>
              <Typography variant="h5" component="div">
                {name}
              </Typography>
              <Typography
                sx={{ mb: "1.5rem" }}
                color={theme.palette.secondary[400]}
              >
                {Number(price).toFixed(2)} Rs
              </Typography>
            </Box>
            <Box>
              <ImageList sx={{ width: 80, height: 80 }} cols={1}>
                <ImageListItem>
                  <img
                    src={productImage ? `http://localhost:5001/images/${productImage}` : "https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg"}
                    srcSet={productImage ? `http://localhost:5001/images/${productImage}` : "https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg"}
                    alt="Not Found"
                    loading="lazy"
                  />
                </ImageListItem>
              </ImageList>
            </Box>
          </Box>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="primary"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            See More
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setData(name, _id, description, price, category, supply);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => {
              //setId(_id);
              deleteHandle(_id);
            }}
          >
            Delete
          </Button>
        </CardActions>
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{
            color: theme.palette.neutral[300],
          }}
        >
          <CardContent>
            <Typography>id: {_id}</Typography>
            <Typography>Supply Left: {supply}</Typography>
            <Typography>
              Yearly Sales This Year: {stat.yearlySalesTotal}
            </Typography>
            <Typography>
              Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
            </Typography>
          </CardContent>
        </Collapse>
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>updateProduct Product</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                value={p_name}
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
                id="name"
                label="Stock"
                value={p_stock}
                onChange={(e) => {
                  setStock(e.target.value);
                }}
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Price per Unit"
                type="number"
                value={p_price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                fullWidth
                variant="standard"
              />
              <FormControl variant="standard" fullWidth sx={{ mt: "2px" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  //value={age}
                  fullWidth
                  value={p_category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  //onChange={handleChange}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {result.data?.length > 0 &&
                    result.data.map((item) => {
                      return <MenuItem value={item.name}>{item.name}</MenuItem>;
                    })}
                </Select>
              </FormControl>
              <FormControl variant="standard" fullWidth sx={{ mt: "5px" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Brand
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  //value={age}
                  fullWidth
                  value={brands}
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                  //onChange={handleChange}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {brand.data?.length > 0 &&
                    brand.data.map((item) => {
                      return <MenuItem value={item.name}>{item.name}</MenuItem>;
                    })}
                </Select>
              </FormControl>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Description"
                type="text"
                fullWidth
                value={p_description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="error">
                Cancel
              </Button>
              <Button
                onClick={submitHandle}
                variant="contained"
                color="success"
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Card>
    </>
  );
};

const Products = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brands, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState();
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  //const [category, setCategory] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandle = async () => {
    const data = new FormData();
    data.append("image", image);
    data.append("name", name);
    data.append("description", description);
    data.append("category", category);
    data.append("brands", brands);
    data.append("stock", stock);
    data.append("price", price);
    const response = await axiosFileInstance.post(
      "client/products",
      data
    );
    const data2 = await response.json();
    console.log(data2);
    setOpen(false);
  };

  const { data, isLoading } = useGetProductsQuery();
  const result = useGetCategorysQuery();
  const brand = useGetBrandsQuery();

  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  //setCategory(result.data);
  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Box display="flex" justifyContent="space-between">
          <Header
            title="PRODUCTS"
            subtitle="See your list of products."
          ></Header>
          <Button
            variant="contained"
            color="success"
            size="small"
            sx={{ fontWeight: "bold", height: "45px" }}
            onClick={handleClickOpen}
          >
            Add Product
          </Button>
        </Box>
        {data || !isLoading ? (
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {data.map(
              ({
                _id,
                name,
                description,
                price,
                rating,
                category,
                supply,
                stat,
                image
              }) => (
                <Product
                  key={_id}
                  _id={_id}
                  name={name}
                  description={description}
                  price={price}
                  rating={rating}
                  category={category}
                  supply={supply}
                  stat={stat}
                  productImage={image}
                />
              )
            )}
          </Box>
        ) : (
          <>Loading...</>
        )}
      </Box>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Product</DialogTitle>
          <DialogContent>
            <Box
              height="160px"
              width="160px"
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                margin: "auto",
                color: "white",
                borderRadius: "50%",
                padding: "0.2rem 0.5rem",
              }}
            >
              <label htmlFor="profile" style={{ display: "inline" }}>
                <img
                  style={{
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  width="160px"
                  height="160px"
                  alt="user"
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : "https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg"
                  }
                />
              </label>
              <input
                type="file"
                id="profile"
                name="profile"
                style={{ display: "none", cursor: "pointer" }}
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </Box>
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
              id="name"
              label="Stock"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Price per Unit"
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              fullWidth
              variant="standard"
            />
            <FormControl variant="standard" fullWidth sx={{ mt: "2px" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                //value={age}
                fullWidth
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                //onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {result.data?.length > 0 &&
                  result.data.map((item) => {
                    return <MenuItem value={item.name}>{item.name}</MenuItem>;
                  })}
              </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth sx={{ mt: "5px" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Brand
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                //value={age}
                fullWidth
                value={brands}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
                //onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {brand.data?.length > 0 &&
                  brand.data.map((item) => {
                    return <MenuItem value={item.name}>{item.name}</MenuItem>;
                  })}
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              type="text"
              fullWidth
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
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

export default Products;
