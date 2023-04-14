import React, { useEffect } from 'react';
import { useState } from 'react';
import { getFotoMulta } from '../../services/getFotoMulta';
import { getAvailableTemplates } from '../../services/getAvailableTemplates';
import { Form, FormGroup, Stack, TextInput, Button, Select, SelectItem } from '@carbon/react';

const DocumentForm = () => {
	const [availableTemplates, setAvailableTemplates] = useState([]);
	const [templateOptions, setTemplateOptions] = useState(null);
	const [selectedTemplate, setSelectedTemplate] = useState(null);
	const [dynamicForm, setDynamicForm] = useState(null);

	const submitInfo = async () => {
		let formData = {
			name,
			plate,
			model,
		};

		let data = await getFotoMulta(formData);
		const url = window.URL.createObjectURL(new Blob([data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'Nuevo Doc.docx');
		document.body.appendChild(link);
		link.click();
	};

	const handleTextChange = (event) => {
		let newText = event.target.value;
		switch (event.target.id) {
			case 'name':
				setName(newText);
				break;
			case 'plate':
				setPlate(newText);
				break;
			case 'model':
				setModel(newText);
				break;
			default:
				break;
		}
	};

	const getTemplatesList = async () => {
		try {
			let data = await getAvailableTemplates('pakeperez@gmail.com');
			console.log(data);
			setAvailableTemplates(data);
		} catch (error) {
			//TODO: Send notification or something else
			console.error(error);
		}
	};

	useEffect(() => {
		getTemplatesList();
	}, []);

	useEffect(() => {
		if (availableTemplates) {
			let buildOptions = availableTemplates.map((template, i) => {
				return <SelectItem key={`template-option-${i}`} value={template.id} text={template.fileName} />;
			});
			setTemplateOptions(buildOptions);
		}
	}, [availableTemplates]);

	const handleSelectTemplate = (event) => {
		let templateId = event.target.value;
		let selected = availableTemplates.find((template) => {
			return template.id === templateId;
		});
		console.log(selected);
		setSelectedTemplate(selected);
	};

	const buildForm = () => {
		let templateFields = selectedTemplate.fields;
		let fieldKeys = Object.keys(templateFields);
		let formItems = fieldKeys.map((fieldKey) => {
			let field = templateFields[fieldKey];
			let dataType = field.dataType;
			if (dataType === 'string') {
				return (
					<>
						<div className="cds--content modal-summary-header-text">{field.description}</div>
						<TextInput onChange={handleTextChange} id={`text-${field.placeholder}`} hideLabel={true} />
					</>
				);
			}
			// else if(dataType==='number'){}
			// else if (dataType === 'date') { }
		});
		setDynamicForm(<FormGroup style={{ maxWidth: '400px' }}>{formItems}</FormGroup>);
	};

	useEffect(() => {
		if (selectedTemplate) {
			buildForm();
		}
	}, [selectedTemplate]);

	return (
		<>
			{templateOptions ? (
				<>
					<div className="cds--content  modal-summary-header-text">Seleccione la plantilla que desea usar</div>
					<Select id="select-template" onChange={handleSelectTemplate} hideLabel={true}>
						{templateOptions.map((option) => option)}
					</Select>
				</>
			) : null}
			{dynamicForm ? (
				<Form>
					<Stack gap={7}>
						{dynamicForm}
						<Button onClick={submitInfo}>Submit</Button>
					</Stack>
				</Form>
			) : null}
		</>
	);
};

export default DocumentForm;
