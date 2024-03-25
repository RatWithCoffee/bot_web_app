import * as svg from './svg.js'	

const textQuestion = `
<div class="question-container" id="question">
<div class="row">
	<input type="text" placeholder="Вопрос" id="text" />
	<button class="checkbox-text custom-button button-delete"  id="delete-q-button">
		${svg.deleteIconBin}
	</button>
</div>
`;

export const getInputHTML = (type) => {
	return `<div class="checkbox-container">
				<input type="${type}" class="checkbox-input" disabled>
				<input type="text" class="checkbox-text" placeholder="Ответ" id="ans">
				<button class="checkbox-text custom-button button-delete" style="display: block" id="delete-ans-button">
					${svg.deleteIconCross}
				</button>
			</div>
`
}



export const getQuestionHTML = (type) => {
	if (type === questionTypes.TEXT) {
		return textQuestion
	}

	const input = getInputHTML(type);

	return `
		<div class="question-container" id="question">
		<div class="row">
			<input type="text" placeholder="Вопрос" id="text" />
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
		
		
			<div class="checkbox-container">
				<div>Обязательный вопрос</div>
				<div class="checkbox-text">
					<label class="switch">
						<input type="checkbox" id="switch">
						<span class="slider round"></span>
					</label>
				</div>
		
			</div>
		</div>
		</div>
	`;
}


export const questionTypes = { CHECKBOX: "checkbox", RADIO: "radio", TEXT: "text" }


