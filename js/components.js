import * as svg from './svg.js'

const switchButton = `
	<div class="checkbox-container style="justify-content: flex-start;"">
		<div class="switch-label " >Обязательный вопрос</div>
		<div class="checkbox-text ">
			<label class="switch">
				<input type="checkbox" id="switch" checked>
				<span class="slider round"></span>
			</label>
		</div>
	</div>
	`;

const textQuestion = `
<div class="question-container" id="question">
<div class="row">
	<textarea  autocomplete="off" type="text" placeholder="Вопрос" id="text" style="width: 100%;"></textarea>
	<button class="checkbox-text custom-button button-delete"  id="delete-q-button">
		${svg.deleteIconBin}
	</button>
</div>
${switchButton}
`;

export const getInputHTML = (type, display='block') => {
	return `<div class="checkbox-container" id="container-ans">
				<input autocomplete="off" type="${type}" class="checkbox-input " disabled>
				<input autocomplete="off" type="text" class="checkbox-text" placeholder="Ответ" id="ans">
				<button class="checkbox-text custom-button button-delete" style="display: ${display}"  id="delete-ans-button">
					${svg.deleteIconCross}
				</button>
			</div>
`
}



export const getQuestionHTML = (type) => {
	if (type === questionTypes.TEXT) {
		return textQuestion
	}

	const input = getInputHTML(type, 'none');

	return `
		<div class="question-container" id="question">
		<div class="row">
			<textarea autocomplete="off" type="text" placeholder="Вопрос" id="text" style="width: 100%;"></textarea>
			<button class="checkbox-text custom-button button-delete" id="delete-q-button">
				${svg.deleteIconBin}
			</button>
		</div>
		
		<span id="list">
			${input}
		</span>
		
		
		<div class="row">
			<button class="custom-button button-plus" id="add-ans-button">
				${svg.plusIcon}
			</button>
		
		
			${switchButton}
		</div>
		</div>
	`;
}


export const questionTypes = { CHECKBOX: "checkbox", RADIO: "radio", TEXT: "text" }


