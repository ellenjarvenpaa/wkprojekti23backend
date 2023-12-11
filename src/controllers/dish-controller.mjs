import {
  fetchAllDishes,
  fetchDishById,
  addDish,
  fetchOffers,
  fetchDishesWithOffers,
} from "../models/dish-model.mjs";


const resDataForDishes = (rows) => {
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
  return result;
}

const getDishes = async (req, res) => {
  const rows = await fetchAllDishes();
  if (rows.error) {
    return next(new Error(result.error));
  }
  const result = resDataForDishes(rows);
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

// api/dish/offers
const getOffers = async (req, res, next) => {
  // req.user is added by authenticateToken middleware
  if (req.user) {
    console.log('user', req.user);
    const today = new Date().toISOString();
    console.log('today is', today);
    const date = today.slice(0, 10);
    console.log(date);
    const rows = await fetchOffers(date);
    if (rows.error) {
      return next(new Error(rows.error));
    }
    res.json({offer_dishes: rows});
  } else {
    const error = new Error('unauthorized');
    error.status = 401;
    next(error);
	}

}

// api/dish/logged
const getDishWithOffers = async (req, res, next) => {
  // req.user is added by authenticateToken middleware
  if (req.user) {
    console.log('user', req.user);
    const rows = await fetchDishesWithOffers();
    if (rows.error) {
      return next(new Error(result.error));
    }
    const result = resDataForDishes(rows);
    res.json(result);
  } else {
    const error = new Error('unauthorized');
    error.status = 401;
    next(error);
	}
}

export { getDishes, getDishById, postDish, getOffers, getDishWithOffers };
