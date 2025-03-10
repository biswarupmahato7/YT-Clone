import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const auth = async (req, res, next) => {
    try {
        const token = req.cookies?.token; // Safe access to cookies
        if (!token) {
            return res.status(401).json({ error: 'User not authorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');

        if (!req.user) {
            return res.status(404).json({ error: 'User not found' });
        }

        next();
    } catch (error) {
        res.clearCookie('token'); // Clear invalid token
        return res.status(401).json({ error: 'Token is not valid' });
    }
};

export default auth;
