import User from '../models/user.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getUsers = async (req, res) => {
	try {
		const Users = await User.find();

		res.status(200).json(Users)
	} catch (error) {
		res.status(404).json({message: error.message})
	}
}

export const getUser = async (req, res) => {
	const { id: _id } = req.params;

	try{
		const user = await User.findById(_id)

		res.status(200).json(user)
	} catch (error) {
		res.status(404).json({message: error.message})
	}
}

export const signin = async (req, res) => {
	const {email, password} = req.body;

	try{
		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return res.status(404).json({ message: "User doesn't exist. " })
		}

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Your email and password don't match. " })
		}

		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", {expiresIn: "1h"})

		res.status(200).json({ result: existingUser, token})

	} catch (error) {
		res.status(500).json({message: "Something went wrong. "})
	}
}

export const signup = async (req, res) => {
	const {username, email, password} = req.body;
	console.log(username, email)
	try{

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists. " })
		}

		const hashed = await bcrypt.hash(password, 12)

		const result = await User.create({ username, email, password: hashed, todo: [], doing: [], done: []})

		const token = jwt.sign({ email: result.email, id: result._id }, "test", {expiresIn: "1h"})

		res.status(200).json({ result, token})

	} catch (error) {
		console.log(error)
		res.status(500).json({message: "Something went wrong. "})
	}
}

export const updateUserData = async (req, res,) => {
	const { id: _id } = req.params;
	const userData = req.body;

	if (!mongoose.Types.ObjectId.isValid(_id)) {
		console.log("Invalid User")
		return res.status(404).send("No user found.")
	}

	const updatedUser = await User.findByIdAndUpdate(_id, { ...userData, _id}, {new : true});

	res.json(updatedUser)
}