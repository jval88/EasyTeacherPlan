import establishConnection from "../establishConnection"
import Dummy from "../models/Dummy"
import DummyData from "../interfaces/DummyData"
import RequestHandler from "../interfaces/RequestHandler"

// CREATE

export const postDummy: RequestHandler = async (req, res) => {
	try {
		await establishConnection()
		const { name, number } = req.body
		if (!name) throw new Error()
		const data: DummyData = { name, number }
		const dummy = await Dummy.create(data)
		res.status(201).json(dummy)
	} catch (error) {
		let code = 400
		let message = "bad request, failed POST dummy"
		res.status(code).json({ error: message })
	}
}

// READ

export const getDummies: RequestHandler = async (req, res) => {
	try {
		await establishConnection()
		const dummies = await Dummy.find()
		res.status(200).json(dummies)
	} catch (err) {
		let code = 500
		let message = "server error, failed GET dummies"
		res.status(code).json({ error: message })
	}
}

export const getDummy: RequestHandler = async (req, res) => {
	try {
		await establishConnection()
		const dummy = Dummy.findById(req.params.id)
		res.status(200).json(dummy)
	} catch (error) {
		let code = 404
		let message = "dummy not found, failed GET dummy"
		res.status(code).json({ error: message })
	}
}

// UPDATE

export const putDummy: RequestHandler = async (req, res) => {
	try {
		await establishConnection()
		const { name, number } = req.body
		const data: DummyData = { name, number }
		const dummy = Dummy.findByIdAndUpdate(req.params.id, data)
		res.status(200).json(dummy)
	} catch (error) {
		let code = 404
		let message = "dummy not found, failed PUT dummy"
		res.status(code).json({ error: message })
	}
}

// DESTROY

export const deleteDummy: RequestHandler = async (req, res) => {
	try {
		await establishConnection()
		await Dummy.findByIdAndDelete(req.params.id)
		res.status(204).json()
	} catch (error) {
		let code = 404
		let message = "dummy not found, failed DELETE dummy"
		res.status(code).json({ error: message })
	}
}
