import express from 'express';
import userModel from '../Models/user.model.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const cookieOptions = {
    httpOnly: true,
    secure: false, 
    sameSite: 'Lax'
};

export const signup = async (req, res) => {
    try {
        const { channelName, email, password, profilePic } = req.body;
        const isExist = await userModel.findOne({ email });
        const isChannelName = await userModel.findOne({ channelName });

        if (isChannelName) {
            return res.status(400).json({ error: 'Channel name exists, try another name' });
        }
        if (isExist) {
            return res.status(400).json({ error: 'User already exists, please try another username' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            channelName,
            email,
            password: hashedPassword,
            profilePic
        });

        await newUser.save();
        res.status(201).json({
            message: 'User registered successfully',
            newUser
        });

    } catch (error) {
        res.status(500).json({
            message: 'Registration failed',
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, cookieOptions);

        res.json({
            message: 'Logged in successfully',
            success: true,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', cookieOptions);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Logout failed', error: error.message });
    }
};
