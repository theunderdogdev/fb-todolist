import addTo from "./AddToDo.module.css";
const AddToDo = ({ onChange, onClick, todoVals }) => {
	return (
		<div className={"card " + addTo.category}>
			<input
				name="title"
				type="text"
				value={todoVals.title}
				placeholder="Title"
				className={"form-control " + addTo.bodyEdit}
				onChange={onChange}
			/>
			<textarea
				type="text"
				placeholder="Description"
				name="desc"
				value={todoVals.desc}
				className={"form-control " + addTo.bodyEdit}
				onChange={onChange}
			/>
			<button
				type="button"
				className={"btn btn-outline-dark " + addTo.addBtn}
				onClick={onClick}>
				Add
			</button>
		</div>
	);
};

export default AddToDo;
