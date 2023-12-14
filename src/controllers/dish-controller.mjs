import {
  fetchAllDishes,
  fetchDishById,
  addDish,
  fetchOffers,
  fetchDishesWithOffers,
  updateDishById,
  deleteDishById,
  addOfferByDishId,
  fetchDishByIdLogged,
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
};

const getDishes = async (req, res) => {
  const rows = await fetchAllDishes();
  if (rows.error) {
    return next(new Error(result.error));
  }
  const result = resDataForDishes(rows);
  res.json(result);
};

const getDishById = async (req, res, next) => {
  // if user is not logged in
  let result;
  if (!req.user) {
     result = await fetchDishById(req.params.id);
  } else {
     result = await fetchDishByIdLogged(req.params.id);
  }
  // error handling
  if (result) {
    if(result.error) {
      // serverilla on error
      next(new Error(result.error));
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({ message: "dish not found", dish_id: req.params.id });
  }
};


const postDish = async (req, res, next) => {
  const { filename, size, mimetype } = req.file;
  console.log(req.file);
  const { dish_name, dish_price, description, category_id } = req.body;
  console.log(req.body);
  const user_level_id = req.user.user_level_id;
  //admin can add dish
  if (user_level_id === 2 || user_level_id === 1) {
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
    };
  } else {
    const error = new Error('you are not an admin');
    error.status = 401;
    return next(error);
  }

};

// api/dish/offers
const getOffers = async (req, res, next) => {
  // req.user is added by authenticateToken middleware
  if (req.user) {
    console.log("user", req.user);
    const today = new Date().toISOString();
    console.log("today is", today);
    const date = today.slice(0, 10);
    console.log(date);
    const rows = await fetchOffers(date);
    if (rows.error) {
      return next(new Error(rows.error));
    }
    res.json({ offer_dishes: rows });
  } else {
    const error = new Error("unauthorized");
    error.status = 401;
    next(error);
  }
};

// api/dish/offers/:id for admin
const postOffer = async (req, res, next) => {
  if (req.user) {
    console.log("user", req.user);
    console.log('request body', req.body);
    const newOffer = req.body;
    const newOfferId = await addOfferByDishId(newOffer);
    if (newOfferId.error) {
      return next(new Error(newOfferId.error));
    }
    res.json({ message: "offer added", offer_id: newOfferId });
  } else {
    const error = new Error("unauthorized");
    error.status = 401;
    next(error);
  }
}



// api/dish/logged
const getDishWithOffers = async (req, res, next) => {
  // req.user is added by authenticateToken middleware
  if (req.user) {
    console.log("user", req.user);
    const rows = await fetchDishesWithOffers();
    if (rows.error) {
      return next(new Error(result.error));
    }
    const result = resDataForDishes(rows);
    res.json(result);
  } else {
    const error = new Error("unauthorized");
    error.status = 401;
    next(error);
  }
};

const updateDish = async (req, res, next) => {
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

const deleteDish = async (req, res, next) => {
  const dish_id = req.params.id;
  const result = await deleteDishById(dish_id);
  console.log(result);
  res.status(200).json({ message: "Dish deleted.", ...result });
};

export {
  getDishes,
  getDishById,
  postDish,
  getOffers,
  getDishWithOffers,
  updateDish,
  deleteDish,
  postOffer
};
