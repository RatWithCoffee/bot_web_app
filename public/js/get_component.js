import { getQuestionHTML, getInputHTML } from "./components.js"



export const getQuestion = (questionId, questionType) => {
	return getQuestionHTML(questionType, questionId, 1);
}


export const getInput = (questionId, type, answerNumber) => {
	return getInputHTML(type, questionId, answerNumber);
}
