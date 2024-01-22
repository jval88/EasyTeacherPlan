import axios from "axios"
import Dummy from "../interfaces/Dummy"

const url = import.meta.env.VITE_API_URL

const getToken = async (): Promise<string> => {
	// implement token logic here
	return "dummy-token"
}

// CREATE

export const postDummy = async (dummy: Dummy): Promise<Dummy> =>
	(
		await axios.post(
			url + "/admin/dummies",
			{ ...dummy },
			{
				headers: {
					Authorization: `Bearer ${await getToken()}`
				}
			}
		)
	).data

// UPDATE

export const putDummy = async (
	id: string,
	dummy: Dummy
): Promise<Dummy> =>
	(
		await axios.put(
			url + "/admin/dummies/" + id,
			{ ...dummy },
			{
				headers: {
					Authorization: `Bearer ${await getToken()}`
				}
			}
		)
	).data

// DESTROY

export const deleteDummy = async (id: string): Promise<void> =>
	await axios.delete(url + "/admin/dummies/" + id, {
		headers: {
			Authorization: `Bearer ${await getToken()}`
		}
	})
