import { fetchAllDishes } from "../models/dish-model.mjs";

const getDishes = async (req, res) => {
	const dishes = await fetchAllDishes();
	res.json(dishes);
};


export {getDishes};
