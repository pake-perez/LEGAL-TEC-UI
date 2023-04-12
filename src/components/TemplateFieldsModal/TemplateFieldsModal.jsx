import React from 'react';
import { useEffect, useState } from 'react';
import { TextInput, Button, Modal, Dropdown, Select, SelectItem, Grid, Row, Column } from '@carbon/react';

export const TemplateFieldsModal = ({ isModalOpen, setIsModalOpen, templateData }) => {
	const [modalInputsList, setModalInputsList] = useState([]);
	const [dataReadyToShow, setDataReadyToShow] = useState(false);
	const [primaryButtonText, setPrimaryButtonText] = useState('Siguiente');
	const [secondaryButtonText, setSecondaryButtonText] = useState('Cancelar');
	const [currentTemplateData, setCurrentTemplateData] = useState({});
	const [indexToShow, setIndexToShow] = useState(0);
	const [showSummary, setShowSummary] = useState(false);

	useEffect(() => {
		if (templateData?.fields) {
			let inputList = Object.keys(templateData.fields).map((fieldKey) => {
				return (
					<div key={fieldKey}>
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

	const handlePrimaryClick = () => {
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

			console.log(currentFields);

			setIsModalOpen(false);
			setCurrentTemplateData({ ...templateData });
			setIndexToShow(0);
		}
	};

	const handleSecondarySubmit = () => {
		setCurrentTemplateData({ ...templateData });
		setIsModalOpen(false);
		setIndexToShow(0);
	};

	const handleCloseModal = () => {
		setCurrentTemplateData({ ...templateData });
		setIsModalOpen(false);
		setIndexToShow(0);
	};

	const buildSummary = (inputGroup) => {
		return inputGroup;
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
