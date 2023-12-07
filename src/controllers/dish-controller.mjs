import {
  fetchAllDishes,
  fetchDishById,
  addDish,
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
    res.json({ dish: result });
  } else {
    res.status(404);
    res.json({ message: "dish not found", dish_id: req.params.id });
  }
};

const postDish = async (req, res) => {
  const { filename, size, mimetype } = req.file;
  console.log(req.file);
  const { dish_name, dish_price, description, category_id } = req.body;
  console.log(req.body);
  if (filename && dish_name && dish_price) {
    const result = await addDish({
      filename,
      size,
      mimetype,
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

export { getDishes, getDishById, postDish };
