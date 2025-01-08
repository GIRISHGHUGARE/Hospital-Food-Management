// src/app/api/foodCharts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import FoodChart from '../../../models/FoodChart'; // Assuming the FoodChart model is in the models folder
import connectDb from '../../../config/db';

const getFoodCharts = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            await connectDb();
            const foodCharts = await FoodChart.find();
            res.status(200).json(foodCharts);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch food charts' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

const createFoodChart = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const newFoodChart = new FoodChart(req.body);

        try {
            await connectDb();
            await newFoodChart.save();
            res.status(201).json(newFoodChart);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create food chart' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export { getFoodCharts, createFoodChart };
