import { promisePool } from "../utils/database.mjs";

const fetchAllDishes = async () => {
	try {
		const sql = `SELECT dish_id, dish_name, dish_price, description, Categories.category_name
		FROM Dishes, Categories
		WHERE Dishes.category_id = Categories.category_id;`
		const [rows] = await promisePool.query(sql);
		console.log('result', rows);
		return rows;
	} catch (e) {
		console.error('error', e.message);
		return {error: e.message};
	}
}

export {fetchAllDishes};
