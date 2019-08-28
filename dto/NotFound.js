import express from 'express';

const NotFound = express.Router();

NotFound.use((req, res, next) => {
    const message = 'Not Found';
    res.status(404).json({
        message
    });
});

export default NotFound;