import { promisePool } from "../utils/database.mjs";

/**
 * Fetch all dishes info from database
 *
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
 * Fetch dish info by id
 *
 * @param {*} id - dish id
 * @returns {object} dish - object containing dish info
 *
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

const fetchDishByIdLogged = async (id) => {
  try {
    const sql = `SELECT
    Dishes.dish_id,
    dish_name,
    ROUND((1-Offers.reduction)*dish_price,2) AS offer_price,
    dish_price,
    dish_photo,
    description
  FROM
      Dishes
  LEFT JOIN Offers
    ON Dishes.dish_id = Offers.dish_id
    AND '2023-12-11' BETWEEN start_date AND end_date
    AND Offers.active = 1
  WHERE Dishes.dish_id = ${id}`;
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
 *
 */
const addDish = async (media) => {
  const {
    dish_photo,
    filesize,
    media_type,
    dish_name,
    dish_price,
    description,
    category_id,
  } = media;
  console.log(media);
  const sql = `INSERT INTO Dishes (dish_photo, filesize, media_type,
    dish_name, dish_price, description, category_id)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    dish_photo,
    filesize,
    media_type,
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
 * Fetches offers from database
 *
 * @param {object} date - date of the day
 * @returns - object containing list of offers
 *
 */

const fetchOffers = async (date) => {
  try {
    // const sql = `SELECT Dishes.dish_id, dish_name, Dishes.dish_price,
    // ROUND(Dishes.dish_price*(1-reduction), 2) AS offer_price, description, dish_photo
    // FROM Offers, Dishes
    // WHERE Offers.dish_id = Dishes.dish_id;`;
    console.log("model date", date);
    const sql = `
      SELECT Dishes.dish_id, dish_name, Dishes.dish_price,
        ROUND(Dishes.dish_price*(1-reduction), 2) AS offer_price, description, dish_photo
      FROM Offers, Dishes
      WHERE Offers.dish_id = Dishes.dish_id
      AND '${date}' BETWEEN start_date AND end_date
      AND active = 1`;
    const [rows] = await promisePool.query(sql);
    console.log("result", rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

/**
 * Fetches dishes with offers from database
 *
 * @returns - object containing list of dishes with offers
 *
 */

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
        AND '2023-12-11' BETWEEN start_date AND end_date
        AND Offers.active = 1
      INNER JOIN Categories
        ON Categories.category_id = Dishes.category_id
      GROUP BY
          Dishes.dish_id, dish_name, dish_price, dish_photo, description, Categories.category_name
      ORDER BY Dishes.category_id;`;
    const [rows] = await promisePool.query(sql);
    // console.log('result', rows);
    return rows;
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
 *
 */
const updateDishById = async (dish_id, data) => {
  const sql = `UPDATE Dishes SET dish_name = ?, dish_price = ?, dish_photo = ?, filesize = ?,
  media_type = ?, description = ?, category_id = ? WHERE dish_id = ?`;
  const params = [
    data.dish_name,
    data.dish_price,
    data.dish_photo,
    data.filesize,
    data.media_type,
    data.description,
    data.category_id,
    dish_id,
  ];
  try {
    const result = await promisePool.query(sql, params);
    console.log("result", result);
    return { dish_id: result[0].insertId };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, message: "Internal Server Error" };
  }
};

/**
 * Delete dish from database
 *
 * @param {number} dish_id - id of the dish to be deleted
 * @returns {object} - object containing success status and message
 *
 */

const deleteDishById = async (dish_id) => {
  const sql = `ALTER TABLE Offers DROP FOREIGN KEY offers_ibfk_1`;
  `ALTER TABLE Offers ADD CONSTRAINT offers_ibfk_1 FOREIGN KEY
  dish_id REFERENCES Dishes dish_id ON DELETE CASCADE`;
  const params = [dish_id];
  try {
    const result = await promisePool.query(sql, params);
    console.log("result", result);
    return { dish_id: result[0].insertId };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, message: "Internal Server Error" };
  }
};

// const addOfferByDishId = async (offer) => {
//   try {
//     const {dish_id, reduction, start_date, end_date} = offer;
//     const sql = `INSERT INTO Offers(dish_id, reduction, start_date, end_date, active)
//     VALUES(?, ?, ?, ?, ?);`;
//     const params = [dish_id, reduction, start_date, end_date, 1];
//     const result = await promisePool.query(sql, params);
//     console.log("result", result);
//     return result[0].insertId;
//   } catch (e) {
//     console.error("error", e.message);
//     return { error: e.message };
//   }
// }

// first, set active = 0 to all rows with the dish id to be inserted,
// then insert dish new offer
const addOfferByDishId = async (offer) => {
  const connection = await promisePool.getConnection();
  let result;
  try {
    const {dish_id, reduction, start_date, end_date} = offer;
    await connection.beginTransaction();
    const sql1 = `UPDATE Offers SET active = 0 WHERE dish_id = ${dish_id};`;
    const result1 = await connection.query(sql1);
    console.log(result1);
    const sql2 = `INSERT INTO Offers(dish_id, reduction, start_date, end_date, active)
    VALUES(?, ?, ?, ?, ?);`;
    const params = [dish_id, reduction, start_date, end_date, 1];
    const result2 = await connection.query(sql2, params);
    result = result2[0].insertId;
    await connection.commit();
  } catch (e) {
    await connection.rollback();
    console.error("error", e.message);
    return { error: e.message };
  }
  return result;
}

export {
  fetchAllDishes,
  fetchDishById,
  addDish,
  fetchOffers,
  fetchDishesWithOffers,
  updateDishById,
  deleteDishById,
  addOfferByDishId,
  fetchDishByIdLogged
};
