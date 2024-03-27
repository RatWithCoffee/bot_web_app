import * as svg from './svg.js'

const switchButton = (questNumber) => `
<div class="checkbox-container flex-right">
	<div class="switch">
		<label class="switch__label" for="switch=${questNumber}">
			<div class="switch__circle"></div>
		</label>
		<input class="switch__input" id="switch=${questNumber}" type="checkbox" checked>
	</div>
</div>
	`;

const textQuestion = (questNumber) => `
<div class="question-container" id="question=${questNumber}" data-type="text">
	<div class="row flex-top">
		<div class="textarea">
			<textarea
				placeholder="Итак..." id="text=${questNumber}"></textarea>
			<div class="textarea__icon" onclick="this.parentElement.querySelector('textarea').value = ''">
				<i class="i-delete-keyboard"></i>
			</div>
		</div>
		<button class="btn bad-inv question-container__delete" id="delete-q-button=${questNumber}">
			${svg.deleteIconBin}
		</button>
	</div>
${switchButton(questNumber)}
</div>
`;

export const getInputHTML = (type, questNumber, answerNumber) => {
	return `<div class="checkbox-container answer" id="container-ans=${answerNumber}"  data-type="${type}">
				<div class="input">
				<div class="input__icon"><i class="${type === questionTypes.RADIO ? "i-bsp-ui-radios" : "i-bsp-ui-checks"}"></i></div>
					<input autocomplete="off" type="text" value="" id="q${questNumber}-ans=${answerNumber}">
				</div>
				<button class="btn inv answer__delete" data-command="delete-ans"  id="q${questNumber}-delete-ans-button=${answerNumber}">
					${svg.deleteIconCross}
				</button>
			</div>
`
}



export const getQuestionHTML = (type, questNumber, answerNumber) => {
	if (type === questionTypes.TEXT) {
		return textQuestion(questNumber);
	}

	const input = getInputHTML(type, questNumber, answerNumber);

	return `
		<div class="question-container quest" id="question=${questNumber}">
		<div class="row flex-top">
		<div class="textarea">
			<textarea
				placeholder="Итак..." id="text=${questNumber}"></textarea>
			<div class="textarea__icon" onclick="this.parentElement.querySelector('textarea').value = ''">
				<i class="i-delete-keyboard"></i>
			</div>
		</div>
			<button class="btn bad-inv question-container__delete" data-command="delete-quest" id="delete-q-button=${questNumber}">
				${svg.deleteIconBin}
			</button>
		</div>
		<div id="list=${questNumber}">
			${input}
		</div>
		<div class="row">
			<button class="btn ok-inv question-container__add" data-command="add-ans" id="add-ans-button=${questNumber}">
				${svg.plusIcon}
			</button>
	
			${switchButton(questNumber)}
		</div>
		</div>
	`;
}


export const questionTypes = { CHECKBOX: "checkbox", RADIO: "radio", TEXT: "text" };


