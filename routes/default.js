import express from 'express';
const DefaultRoute = express.Router();

DefaultRoute.get('/', (req, res, next) => {
    const message = 'Hello Everyone';
    res.json({ message });
});

export default DefaultRoute;