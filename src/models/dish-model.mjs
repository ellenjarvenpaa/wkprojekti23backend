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
    const sql = `SELECT dish_id, dish_name, dish_price, description
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

/**
 * Update dish info in database
 *
 * @param {number} dish_id - id of the dish to be updated
 * @param {object} data - object containing all information about the dish
 * @returns {object} - object containing success status and message
 */

const updateDishById = async (dish_id, data) => {
  try {
    const result = await promisePool.query(
      `
      UPDATE Dishes
      SET dish_name = ?, dish_price = ?, dish_photo = ?, filesize = ?, media_type = ?, description = ?, category_id = ?
      WHERE dish_id = ?
    `,
      [
        data.dish_name,
        data.dish_price,
        data.dish_photo,
        data.filesize,
        data.media_type,
        data.description,
        data.category_id,
        dish_id,
      ]
    );

    if (result.affectedRows > 0) {
      return { success: true };
    } else {
      return { success: false, message: "Dish not found." };
    }
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, message: "Internal Server Error" };
  }
};

export { fetchAllDishes, fetchDishById, addDish, updateDishById };
