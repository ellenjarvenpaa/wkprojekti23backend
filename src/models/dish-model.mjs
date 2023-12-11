import { promisePool } from "../utils/database.mjs";

/**
 * fetch all dishes info from database
 * @returns {object} - object containing list of menu according to categories
 *
 */
const fetchAllDishes = async () => {
  try {
    const sql = `SELECT dish_id, dish_name, dish_price, description, dish_photo, Categories.category_name
		FROM Dishes, Categories
		WHERE Dishes.category_id = Categories.category_id;`;
    const [rows] = await promisePool.query(sql);
    // console.log('result', rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

/**
 * fetch dish info by id
 * @param {*} id - dish id
 * @returns {object} dish - object containing dish info
 */
const fetchDishById = async (id) => {
  try {
    const sql = `SELECT dish_id, dish_name, dish_price, description, dish_photo
		FROM Dishes WHERE dish_id = ?`;
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    console.log("rows", rows);
    console.log("rows 0", rows[0]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

/**
 * Add new media item to database
 *
 * @param {object} media - object containing all information about the new media item
 * @returns {object} - object containing id of the inserted media item in db
 */
const addDish = async (media) => {
  const {
    filename,
    size,
    mimetype,
    dish_name,
    dish_price,
    description,
    category_id,
  } = media;
  console.log(media);
  const sql = `INSERT INTO Dishes (dish_photo, filesize, media_type, dish_name, dish_price, description, category_id)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    filename,
    size,
    mimetype,
    dish_name,
    dish_price,
    description,
    category_id,
  ];
  try {
    const result = await promisePool.query(sql, params);
    console.log("result", result);
    return { dish_id: result[0].insertId };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const fetchOffers = async (date) => {
  try {
    // const sql = `SELECT Dishes.dish_id, dish_name, Dishes.dish_price,
    // ROUND(Dishes.dish_price*(1-reduction), 2) AS offer_price, description, dish_photo
    // FROM Offers, Dishes
    // WHERE Offers.dish_id = Dishes.dish_id;`;
    console.log('model date', date);
    const sql = `
      SELECT Dishes.dish_id, dish_name, Dishes.dish_price,
        ROUND(Dishes.dish_price*(1-reduction), 2) AS offer_price, description, dish_photo
      FROM Offers, Dishes
      WHERE Offers.dish_id = Dishes.dish_id
      AND '${date}' BETWEEN start_date AND end_date
      GROUP BY Dishes.dish_id
      ORDER BY MIN(offer_price);`;
    const [rows] = await promisePool.query(sql);
    console.log('result', rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const fetchDishesWithOffers = async () => {
  try {
    const sql = `SELECT
        Dishes.dish_id,
        dish_name,
        ROUND((1-Offers.reduction)*dish_price,2) AS offer_price,
        dish_price,
        dish_photo,
        description,
        Categories.category_name
      FROM
        Dishes
      LEFT JOIN Offers
        ON Dishes.dish_id = Offers.dish_id
      INNER JOIN Categories
        ON Categories.category_id = Dishes.category_id
      ORDER BY Dishes.category_id;`;
    const [rows] = await promisePool.query(sql);
    // console.log('result', rows);
    return rows;
  } catch (e){
    console.error("error", e.message);
    return { error: e.message };
  }
};

export { fetchAllDishes, fetchDishById, addDish, fetchOffers, fetchDishesWithOffers };
