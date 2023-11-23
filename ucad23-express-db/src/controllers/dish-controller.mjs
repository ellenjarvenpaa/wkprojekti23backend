import { fetchAllDishes } from "../models/dish-model.mjs";

const getDishes = async (req, res) => {
	const rows = await fetchAllDishes();
	// const categories = [];
	// 	// create caategories array
	// 	rows.forEach((row) => {
	// 		if (!categories.includes(row.category_name)) {
	// 			categories.push(row.category_name);
	// 		}
	// 	});
	// 	console.log('categories includes', categories);

	// 	// create object that includes category name and dishes of that caategory
	// 	categories.forEach((category) => {

	// 		const dishes = [];
	// 		rows.forEach((row) => {

	// 			if (row.category_name === category) {
	// 				delete row.category_name;
	// 				pullatDishes.push(row);
	// 			}
	// 		});
	// 		const resultPullat = {
	// 			category_name: 'pullat',
	// 			dishes: pullatDishes
	// 		};
	// 		console.log(resultPullat);
	// 	});

	res.json(rows);
};


export {getDishes};
