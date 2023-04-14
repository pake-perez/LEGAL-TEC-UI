import React from 'react';
import { useEffect, useState } from 'react';
import { getFotoMulta } from '../../services/getFotoMulta';
import { getAvailableTemplates } from '../../services/getAvailableTemplates';
import { Form, FormGroup, Stack, TextInput, Button, Select, SelectItem, DatePicker, DatePickerInput } from '@carbon/react';

const DocumentForm = () => {
	const [availableTemplates, setAvailableTemplates] = useState([]);
	const [templateOptions, setTemplateOptions] = useState(null);
	const [selectedTemplate, setSelectedTemplate] = useState(null);
	const [dynamicForm, setDynamicForm] = useState(null);
	const [formData, setFormData] = useState({});
	const [currentModify, setCurrentModify] = useState({});

	const submitInfo = async () => {
		let data = await getFotoMulta(formData);
		const url = window.URL.createObjectURL(new Blob([data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'Nuevo Doc.docx');
		document.body.appendChild(link);
		link.click();
	};

	const getTemplatesList = async () => {
		try {
			let data = await getAvailableTemplates('pakeperez@gmail.com');
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

	useEffect(() => {
		if (selectedTemplate) {
			buildForm();
		}
	}, [selectedTemplate]);

	useEffect(() => {
		if (currentModify) {
			let currentData = { ...formData.values };
			currentData[currentModify.field] = currentModify.value;
			setFormData({ ...formData, values: currentData });
		}
	}, [currentModify]);

	const handleSelectTemplate = (event) => {
		let templateId = event.target.value;
		let selected = availableTemplates.find((template) => {
			return template.id === templateId;
		});
		setSelectedTemplate(selected);
	};

	const handleTextChange = (event) => {
		let target = event.target;
		let newText = target.value;
		let fieldKey = target.id.split('-')[1];
		let currentData = { ...formData.values };

		setCurrentModify({ field: fieldKey, value: newText });
	};

	const handleDateChange = (fieldKey, date) => {
		let dateObj = date[0];
		let currentData = { ...formData.values };
		currentData[fieldKey] = date;

		setCurrentModify({ field: fieldKey, value: dateObj.toDateString() });
	};

	const buildForm = () => {
		let templateFields = selectedTemplate.fields;
		let fieldKeys = Object.keys(templateFields);
		let newObj = {};
		newObj.values = {};
		let formItems = fieldKeys.map((fieldKey) => {
			let field = templateFields[fieldKey];
			let dataType = field.dataType;
			newObj.values[fieldKey] = true;
			if (dataType === 'string') {
				return (
					<>
						<div className="cds--content modal-summary-header-text">{field.description}</div>
						<TextInput id={`text-${fieldKey}`} labelText="" hideLabel={true} onChange={handleTextChange} />
					</>
				);
			}
			// else if(dataType==='number'){}
			else if (dataType === 'date') {
				return (
					<>
						<div className="cds--content modal-summary-header-text">{field.description}</div>
						<DatePicker datePickerType="single" onChange={handleDateChange.bind(null, fieldKey)}>
							<DatePickerInput id={`date`} placeholder="mm/dd/yyyy" hideLabel={true} labelText="" />
						</DatePicker>
					</>
				);
			}
		});
		setFormData(newObj);
		setDynamicForm(<FormGroup style={{ maxWidth: '400px' }}>{formItems}</FormGroup>);
	};

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
