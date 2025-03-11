import { Restaurant } from '../models/restaurantmodel.js';

const createRestaurantController = async (req, res) => {
    try {
        const restaurantData = req.body;
        const newRestaurant = new Restaurant(restaurantData);
        await newRestaurant.save();

        res.status(200).send({
            success: true,
            message: "New restaurant created successfully",
            restaurant: newRestaurant, // Fixed wrong variable reference
        });
        
    } catch (error) {
        console.error("Error creating restaurant:", error);
        res.status(500).send({
            success: false,
            message: "Error creating restaurant",
            error: error.message,
        });
    }
}

const getAllRestaurantController = async (req, res) => {
    try {
        const restaurantData = await Restaurant.find({})
            if(!restaurantData){
                res.status(404).send({
                    success: false,
                    message: "No restaurant found"
                })
            }
            res.status(200).send({
                success: true,
                totalcount: restaurantData.length,
                message: "All restaurants showing up",
                restaurantData
            })
        
    } catch (error) {
        console.error("Error getting all restaurant:", error);
        res.status(500).send({
            success: false,
            message: "Error creating restaurant",
            error: error.message,
        });
    }
}

export { createRestaurantController, getAllRestaurantController };