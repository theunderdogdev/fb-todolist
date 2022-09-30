// import React from "react";
import {
	query,
	collection,
	deleteDoc,
	doc,
	updateDoc,
	where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import ToDo from "./ToDo";
const ToDoContainer = ({ db, auth, collName }) => {
	const qr = query(
		collection(db, collName),
		where("uid", "==", auth.currentUser.uid)
	);
	const [allMessages] = useCollection(qr);
	const deleteToDo = (id) => {
		deleteDoc(doc(db, "todos", id));
	};
	const setToDoDone = (id) => {
		updateDoc(doc(db, "todos", id), { status: "done" });
	};

	return (
		<ul className="categories">
			{allMessages?.docs.map((message) => {
				const { title, desc, status } = message.data();
				return (
					<ToDo
						key={message.id}
						id={message.id}
						title={title}
						desc={desc}
						status={status}
						deleteToDo={deleteToDo}
						setToDoDone={setToDoDone}
					/>
				);
			})}
		</ul>
	);
};

export default ToDoContainer;
