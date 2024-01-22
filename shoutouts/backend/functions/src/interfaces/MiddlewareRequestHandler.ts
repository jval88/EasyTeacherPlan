import { Request, Response, NextFunction } from "express"

export default interface MiddlewareRequestHandler {
	(req: Request, res: Response, next: NextFunction): Promise<void>
}
