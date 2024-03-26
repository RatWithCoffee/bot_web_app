import { getQuestionHTML, getInputHTML } from "./components.js"



export const getQuestion = (newId, questionType) => {


	const question = getQuestionHTML(questionType);
	let currAns = 0;
	const updatedQ = question.replace(/id="([^"]*)"/g, (_, id) => {
		if (id === "ans") {
			currAns++;
			id = "q" + newId + "-ans=" + currAns;
		} else if (id === "delete-ans-button") {
			id = "q" + newId + "-delete-ans-button=" + 1;
		}
		else {
			id = id ? id : "";
			id += "=" + newId;
		}
		return `id="${id}"`;
	});


	return updatedQ;
}


export const getInput = (questionId, type, answerNumber) => {
	const input = getInputHTML(type);

	const newInput = input.replace(/id="([^"]*)"/g, (_, newId) => {
		if (newId === "ans") {
			newId = "q" + questionId + "-ans=" + answerNumber;
		} else if (newId === "delete-ans-button") {
			newId = "q" + questionId + "-delete-ans-button=" + answerNumber;
		} else if (newId === "container-ans") {
			newId += "=" + answerNumber;
		} else
		
		{
			newId = newId ? newId : "";
			newId += "=" + questionId;
		}

		return `id="${newId}"`;
	});

	
	return newInput;
}
