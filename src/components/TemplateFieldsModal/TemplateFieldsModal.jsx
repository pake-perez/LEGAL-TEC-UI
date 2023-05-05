import React from 'react';
import { useEffect, useState } from 'react';
import { TextInput, Button, Modal, Dropdown, Select, SelectItem, Grid, Row, Column } from '@carbon/react';
import { putTemplateStructure } from '../../services/putTemplateStructure';

export const TemplateFieldsModal = ({ isModalOpen, setIsModalOpen, templateData }) => {
	const [modalInputsList, setModalInputsList] = useState([]);
	const [dataReadyToShow, setDataReadyToShow] = useState(false);
	const [primaryButtonText, setPrimaryButtonText] = useState('Siguiente');
	const [secondaryButtonText, setSecondaryButtonText] = useState('Cancelar');
	const [currentTemplateData, setCurrentTemplateData] = useState({});
	const [indexToShow, setIndexToShow] = useState(0);
	const [showSummary, setShowSummary] = useState(false);

	//Create a list of components to define field data on the modal.
	useEffect(() => {
		if (templateData?.fields) {
			let inputList = Object.keys(templateData.fields).map((fieldKey) => {
				return (
					<div key={fieldKey}>
						<div className="modal-field-header-text"> Campo: {fieldKey}</div>
						<TextInput id={`text-${fieldKey}`} labelText="Descripción del campo" />
						<br></br>
						<Select id={`select-${fieldKey}`} labelText="Tipo de Dato">
							<SelectItem value="string" text="Texto" />
							<SelectItem value="number" text="Numero" />
							<SelectItem value="date" text="Fecha" />
						</Select>
						<br></br>
						<br></br>
					</div>
				);
			});
			setModalInputsList(inputList);
			setPrimaryButtonText(inputList.length > 1 ? 'Siguiente' : 'Finalizar');
			setDataReadyToShow(true);
			setCurrentTemplateData({ ...templateData });
		}
	}, [templateData]);

	//Logig for the primary button
	const handlePrimaryClick = async () => {
		if (primaryButtonText === 'Siguiente') {
			let currentFields = { ...currentTemplateData.fields };
			let currentFieldKey = Object.keys(currentFields)[indexToShow];

			let fieldDescription = document.getElementById(`text-${currentFieldKey}`).value;
			let fieldDataType = document.getElementById(`select-${currentFieldKey}`).value;
			currentFields[currentFieldKey] = { ...currentFields[currentFieldKey], description: fieldDescription, dataType: fieldDataType };

			setCurrentTemplateData({ ...currentTemplateData, fields: currentFields });

			let nextIndex = indexToShow + 1;
			setIndexToShow(nextIndex);
			if (nextIndex >= modalInputsList.length) {
				setPrimaryButtonText('Finalizar');
				setShowSummary(true);
			}
		} else {
			//Update data in DB
			try {
				let response = await putTemplateStructure({ templateData: { ...currentTemplateData } });
			} catch (error) {
				// [TODO]: Add some error handling and notification showing for the user
			} finally {
				setIsModalOpen(false);
				setCurrentTemplateData({ ...templateData });
				setIndexToShow(0);
				setShowSummary(false);
			}
		}
	};

	const handleSecondarySubmit = () => {
		setCurrentTemplateData({ ...templateData });
		setIsModalOpen(false);
		setIndexToShow(0);
		setShowSummary(false);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setCurrentTemplateData({ ...templateData });
		setIndexToShow(0);
		setShowSummary(false);
	};

	const handleTextChange = (event) => {
		let target = event.target;
		let fieldKey = event.target.id.split('-')[1];
		let fieldProp = event.target.id.split('-')[0];
		let currentFields = { ...currentTemplateData.fields };
		currentFields[fieldKey].description = target.value;

		//Modify data on current template data
		setCurrentTemplateData({ ...currentTemplateData, fields: currentFields });
	};

	const handleSelectChange = (event) => {
		let target = event.target;
		let fieldKey = event.target.id.split('-')[1];
		let fieldProp = event.target.id.split('-')[0];
		let currentFields = { ...currentTemplateData.fields };
		currentFields[fieldKey][fieldProp] = target.value;

		//Modify data on current template data
		setCurrentTemplateData({ ...currentTemplateData, fields: currentFields });
	};

	const buildSummary = (inputGroup) => {
		let fieldKey = inputGroup.key;
		let fieldData = currentTemplateData.fields[fieldKey];
		return (
			<div key={`sumarry-${fieldKey}`}>
				<div className="cds--content modal-summary-header-text">Campo: {fieldKey}</div>
				<Grid>
					<Column lg={8}>
						<TextInput
							onChange={handleTextChange}
							id={`description-${fieldKey}`}
							labelText="Descripción del campo"
							value={fieldData.description || '-'}
						/>
					</Column>
					<Column lg={8}>
						<Select id={`dataType-${fieldKey}`} labelText="Tipo de Dato" onChange={handleSelectChange}>
							<SelectItem value="string" text="Texto" />
							<SelectItem value="number" text="Numero" />
							<SelectItem value="date" text="Fecha" />
						</Select>
					</Column>
				</Grid>
			</div>
		);
	};

	return (
		<Modal
			open={isModalOpen}
			modalHeading="Variables de Formato"
			modalLabel="Modificar variables de Formato"
			primaryButtonText={primaryButtonText}
			secondaryButtonText={secondaryButtonText}
			onRequestClose={handleCloseModal}
			onRequestSubmit={handlePrimaryClick}
			onSecondarySubmit={handleSecondarySubmit}
		>
			<p style={{ marginBottom: '1rem' }}>Por favor elige el tipo de dato que representa cada campo</p>

			<br></br>
			{dataReadyToShow && modalInputsList ? modalInputsList[indexToShow] : null}
			{showSummary && modalInputsList ? modalInputsList.map(buildSummary) : null}
		</Modal>
	);
};
