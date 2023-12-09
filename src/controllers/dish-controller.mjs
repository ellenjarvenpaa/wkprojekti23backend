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

const updateDish = async (req, res, dish_id) => {
  let body = [];

  req
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", async () => {
      body = Buffer.concat(body).toString();
      console.log("req body", body);

      try {
        body = JSON.parse(body);

        if (!body.dish_name || !body.dish_price) {
          res.status(400).json({ message: "Missing required data." });
          return;
        }

        const result = await updateDishById(dish_id, body);

        if (result.success) {
          res.status(200).json({ message: `Dish with id ${dish_id} updated.` });
        } else {
          res.status(404).json({ message: "Dish not found." });
        }
      } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
};

export { getDishes, getDishById, postDish, updateDish };
