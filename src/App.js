import "./App.css";
import AddToDo from "./components/AddToDo";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import ToDoContainer from "./components/ToDoContainer";
import SignIn from "./components/SignIn";
import { serverTimestamp } from "firebase/firestore";
const firebaseConfig = {
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: process.env.REACT_APP_authDomain,
	projectId: process.env.REACT_APP_projectId,
	storageBucket: process.env.REACT_APP_storageBucket,
	messagingSenderId: process.env.REACT_APP_messagingSenderId,
	appId: process.env.REACT_APP_appId,
	measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
function App() {
	const initial = {
		title: "",
		desc: "",
	};

	const [toDo, setToDo] = useState({ ...initial });
	const handleInput = (ev) => {
		const { value, name } = ev.target;
		setToDo({
			...toDo,
			[name]: value,
		});
	};
	const onTextAdded = (ev) => {
		const messageRef = collection(db, "todos");
		const { uid } = auth.currentUser;

		if (toDo.title === "" || toDo.desc === "") {
			console.log("Something wrong", toDo);
			return;
		}
		addDoc(messageRef, {
			uid: uid,
			title: toDo.title,
			desc: toDo.desc,
			at: serverTimestamp(),
			status: "pending",
		}).then(() => {
			console.log("added");
			setToDo({ ...initial });
		});
	};

	const [user] = useAuthState(auth);

	return (
		<div className="container-fluid main">
			{user ? (
				<>
					<button
						className="btn btn-dark"
						style={{
							position: "absolute",
							top: "10px",
							right: "25px",
						}}
						onClick={() => auth.signOut()}>
						Sign Out
					</button>
					<h3 className="my-2 px-2">{`Welcome ${auth.currentUser.displayName}`}</h3>
					<h3 className="my-3 px-2">Your todos are safe with us</h3>
					<AddToDo
						db={db}
						todoVals={toDo}
						onChange={handleInput}
						onClick={onTextAdded}
					/>
					<ToDoContainer db={db} auth={auth} />
				</>
			) : (
				<SignIn auth={auth} />
			)}
		</div>
	);
}

export default App;
