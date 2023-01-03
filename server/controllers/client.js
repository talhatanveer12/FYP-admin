import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";
import fs from "fs";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink);



export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProducts = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.file?.filename,
    category: req.body.category,
    branch: req.body.brands,
    supply: req.body.stock,
  });

  try {
    await product.save();
    res.status(200).json("Creating Successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProducts = async (req, res) => {
  // const product = new Product({
  //   name: req.body.name,
  //   description: req.body.description,
  //   price: req.body.price,
  //   category: req.body.category,
  //   branch: req.body.brands,
  //   supply: req.body.stock,
  // });

  try {
    await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      branch: req.body.brands,
      supply: req.body.stock,
    });
    res.status(200).json("updating Successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("deleting Successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  const category = await Category.find();
  try {
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBrand = async (req, res) => {
  const brand = await Brand.find();
  try {
    res.status(200).json(brand);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postCategory = async (req, res) => {
  const category = new Category({
    name: "Abc",
  });
  try {
    await category.save();
    res.status(200).json("Creating Successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postBrand = async (req, res) => {
  const brand = new Brand({
    name: req.body.name,
  });
  try {
    await brand.save();
    res.status(200).json("Creating Successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
