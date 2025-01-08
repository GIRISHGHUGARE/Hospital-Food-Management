// src/app/api/deliveries.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../../config/db';
import Delivery from '../../../models/Delivery'; // Assuming the Delivery model is in the models folder

const getDeliveries = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            await connectDb();
            const deliveries = await Delivery.find();
            res.status(200).json(deliveries);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch deliveries' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

const createDelivery = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const newDelivery = new Delivery(req.body);
        try {
            await connectDb();
            await newDelivery.save();
            res.status(201).json(newDelivery);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create delivery' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

const updateDeliveryStatus = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        const { deliveryId, status } = req.body;
        try {
            await connectDb();
            const delivery = await Delivery.findByIdAndUpdate(deliveryId, { status }, { new: true });
            res.status(200).json(delivery);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update delivery status' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export { getDeliveries, createDelivery, updateDeliveryStatus };
