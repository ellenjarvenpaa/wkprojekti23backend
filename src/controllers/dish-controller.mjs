import {
  fetchAllDishes,
  fetchDishById,
  addDish,
  updateDishById,
} from "../models/dish-model.mjs";

const getDishes = async (req, res) => {
  const rows = await fetchAllDishes();
  const result = [];
  const categories = [];
  // create an array of category names
  rows.forEach((row) => {
    if (categories.indexOf(row.category_name) === -1) {
      categories.push(row.category_name);
    }
  });
  // console.log('categories includes', categories);
  // create object that includes category name and dishes of that category
  categories.forEach((catName, i) => {
    const categoryInfo = {};
    categoryInfo.category_name = catName;
    categoryInfo.dishes = [];
    rows.forEach((row) => {
      if (row.category_name === catName) {
        delete row.category_name;
        categoryInfo.dishes.push(row);
      }
    });
    result.push(categoryInfo);
  });
  // console.log('result',result.length, result);
  res.json(result);
};

const getDishById = async (req, res) => {
  const result = await fetchDishById(req.params.id);
  // error handling
  if (result) {
    if (result.error) {
      // serverilla on error
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({ message: "dish not found", dish_id: req.params.id });
  }
};

const postDish = async (req, res) => {
  const { filename, size, media_type } = req.file;
  console.log(req.file);
  const { dish_name, dish_price, description, category_id } = req.body;
  console.log(req.body);
  if (filename && dish_name && dish_price) {
    const result = await addDish({
      filename,
      size,
      media_type,
      dish_name,
      dish_price,
      description,
      category_id,
    });
    if (result.dish_id) {
      res.status(201);
      res.json({ message: "New media dish added.", ...result });
    } else {
      res.status(500);
      res.json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

const updateDish = async (req, res, next) => {
  // check xem co req.user ko, neu co thi la dang nhap
  // req.user is added by authenticateToken middleware
  const dish_id = req.params.id;
  const { dish_name, dish_price, description, category_id } = req.body;
  let dish_photo = "",
    filesize = 0,
    media_type = "";
  if (req.file) {
    dish_photo = req.file.filename;
    filesize = req.file.size;
    media_type = req.file.media_type;
  }
  if (dish_name || dish_price || description || category_id || dish_photo) {
    const updatedDishes = {
      dish_name,
      dish_price,
      dish_photo,
      filesize,
      media_type,
      description,
      category_id,
      dish_id,
    };
    console.log(updatedDishes);
    const result = await updateDishById(dish_id, updatedDishes);
    console.log(result);
    res.status(200).json({ message: "Dish updated.", ...result });
  } else {
    const error = new Error(
      "Missing required data. Please provide at least one field for update."
    );
    error.status = 400;
    res.status(400).json({ message: error.message });
  }
};

export { getDishes, getDishById, postDish, updateDish };
