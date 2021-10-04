import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import userRouter from './routes/user.js'

const app = express();
dotenv.config()

app.use(express.json());
app.use(cors())

app.use('/users', userRouter);

const PORT = process.env.PORT || 5000;
const DATABASEURI = //mongoDB Atlas URI Here

mongoose.connect(DATABASEURI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
		app.listen(PORT, () => console.log(`Server running: ${PORT}`))
	})
	.catch((error) => console.log(error.message))
