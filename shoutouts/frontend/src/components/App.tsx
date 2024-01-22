import { useState, useEffect } from "react"
import "./App.css"
import Dummy from "../interfaces/Dummy"
import { getDummies } from "../services/public"
import { postDummy } from "../services/admin"

function App() {
	const [dummies, setDummies] = useState<Dummy[]>([])
	const [newDummy, setNewDummy] = useState<Dummy>({
		name: "",
		number: 0
	})
	useEffect(() => {
		getDummies().then(dummies => setDummies(dummies))
	}, [])

	const makeDummy = async () => {
		const createdDummy = await postDummy(newDummy)
		setDummies(ds => [...ds, createdDummy])
	}

	return (
		<>
			<h3>Dummies</h3>
			{dummies.map(dummy => (
				<div key={dummy.id}>
					{dummy.name} {dummy.number}
				</div>
			))}
			<h3>Make Dummy</h3>
			<input
				type="text"
				placeholder="name"
				value={newDummy.name}
				onChange={e =>
					setNewDummy(d => ({ ...d, name: e.target.value }))
				}
			/>
			<input
				type="number"
				placeholder="number"
				value={newDummy.number}
				onChange={e =>
					setNewDummy(d => ({ ...d, number: +e.target.value }))
				}
			/>
			<button onClick={makeDummy}>Submit</button>
		</>
	)
}

export default App
