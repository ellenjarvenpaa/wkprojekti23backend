import { fetchAllDishes } from "../models/dish-model.mjs";

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


export {getDishes};
