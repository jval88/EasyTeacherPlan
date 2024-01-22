import axios from "axios"
import Dummy from "../interfaces/Dummy"

const url = import.meta.env.VITE_API_URL

// READ

export const getDummies = async (): Promise<Dummy[]> =>
	(await axios.get(url + "/dummies")).data

export const getDummy = async (id: string): Promise<Dummy> =>
	(await axios.get(url + "/dummies/" + id)).data
