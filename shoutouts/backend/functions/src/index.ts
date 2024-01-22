import * as functions from "firebase-functions"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import dummies from "./routes/dummies"
import publicDummies from "./routes/publicDummies"
import { verifyToken } from "./middleware/auth"

// CONFIG

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

// PUBLIC ROUTES

app.use("/dummies", publicDummies)

// PROTECTED ROUTES

app.use("/admin/dummies", verifyToken, dummies)

// SERVE

export const api = functions.https.onRequest(app)
