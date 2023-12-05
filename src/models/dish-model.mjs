import { promisePool } from "../utils/database.mjs";

/**
 * fetch all dishes info from database
 * @returns {object} - object containing list of menu according to categories
 *
 */
const fetchAllDishes = async () => {
  try {
    const sql = `SELECT dish_id, dish_name, dish_price, description, Categories.category_name
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
export { fetchAllDishes, fetchDishById };
