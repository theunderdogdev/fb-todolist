import tdStyles from "./ToDo.module.css";
const ToDo = ({ id, title, desc, deleteToDo, setToDoDone, status }) => {
	return (
		<div className={`card ${tdStyles.todo}`}>
			<h3
				className={`card-title ${tdStyles.title} ${
					status === "done" ? tdStyles.todoDone : ""
				}`}>
				{title}
			</h3>
			<div
				className={`card-body ${tdStyles.body} ${
					status === "done" ? tdStyles.todoDone : ""
				}`}>
				<p>{desc}</p>
			</div>
			<div className={tdStyles.control}>
				<button
					disabled={status === "done"}
					className={"btn " + tdStyles.ctrlBtn}
					onClick={() => {
						setToDoDone(id);
					}}>
					<i className="bi bi-check2" style={{ color: "limegreen" }}></i>
				</button>
				<button
					className={"btn " + tdStyles.ctrlBtn}
					onClick={() => {
						deleteToDo(id);
					}}>
					<i className="bi bi-dash-circle-dotted" style={{ color: "red" }}></i>
				</button>
			</div>
		</div>
	);
};

export default ToDo;
