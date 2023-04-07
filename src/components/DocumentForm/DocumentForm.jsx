import React from 'react';
import { useState } from 'react';
import { getFotoMulta } from '../../services/getFotoMulta';
import { FormGroup, Stack, TextInput, Button } from '@carbon/react';

const DocumentForm = () => {
	const [name, setName] = useState('');
	const [plate, setPlate] = useState('');
	const [model, setModel] = useState('');

	const submitInfo = async () => {
		let newName = document.getElementById('name').value;
		let newPlate = document.getElementById('plate').value;
		let newModel = document.getElementById('model').value;

		let formData = {
			name,
			plate,
			model,
		};

		let data = await getFotoMulta(formData);
		console.log(data);
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

	return (
		<FormGroup style={{ maxWidth: '400px' }} legendText="Datos de Fotoinfraccion">
			<Stack gap={7}>
				<TextInput onChange={handleTextChange} id="name" labelText="Nombre" />
				<TextInput onChange={handleTextChange} id="plate" labelText="Placa" />
				<TextInput onChange={handleTextChange} id="model" labelText="Modelo" />
				<Button onClick={submitInfo}>Submit</Button>
			</Stack>
		</FormGroup>
	);
};

export default DocumentForm;
