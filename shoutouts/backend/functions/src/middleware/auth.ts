import MiddlewareRequestHandler from "../interfaces/MiddlewareRequestHandler"

export const verifyToken: MiddlewareRequestHandler = async (
	req,
	res,
	next
) => {
	try {
		if (!req.headers.authorization) throw new Error()
		const token = req.headers.authorization.split("Bearer ")[1]
		if (!token) throw new Error()
		// Include more thorough auth logic here
		next()
	} catch (error) {
		res.status(401).send("Unauthorized")
	}
}
