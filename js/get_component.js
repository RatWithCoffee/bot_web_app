import { components } from "./components.js";
export const getQuestion = (newId, q) => {


	let currAns = 0;
	const updatedQ = q.replace(/id="([^"]*)"/g, (_, id) => {
		id = id ? id : "";
		// q1-ans4
		if (id === "ans") {
			currAns++;
			id = "q" + newId + "-ans=" + currAns;
		} else if (id === "delete-ans-button") {
			id = "q" + newId + "-delete-ans-button=" + currAns;
		}
		else {
			id += "=" + newId
		}
		return `id="${id}"`;
	});


	return updatedQ;
}


export const getInput = (questionId, input) => {
	const answers = document.getElementById("list=" + questionId).childElementCount + 1;

	const newInput = input.replace(/id="([^"]*)"/g, (_, id) => {
		id = id ? id : "";
		if (id === "ans") {
			id = "q" + questionId + "-ans=" + answers;
		} else if (id === "delete-ans-button") {
			id = "q" + questionId + "-delete-ans-button=" + answers;
		} else {
			id += "=" + questionId;
		}

		return `id="${id}"`;
	});


	return newInput;
}
