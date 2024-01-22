import { Request, Response } from "express"

export default interface RequestHandler {
	(req: Request, res: Response): Promise<void>
}
