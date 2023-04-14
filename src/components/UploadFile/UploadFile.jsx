import React from 'react';
import { useState } from 'react';
import { postNewDocument } from '../../services/postNewDocument';
import { TemplateFieldsModal } from '../TemplateFieldsModal/TemplateFieldsModal';
import { Form, FormGroup, FormItem, Stack, TextInput, Button, FileUploaderDropContainer, FileUploaderItem } from '@carbon/react';

const UploadFile = () => {
	const [docName, setDocName] = useState('');
	const [file, setFile] = useState(null);
	const [fileExists, setFileExists] = useState(false);
	const [fileUploadStatus, setFileUploadStatus] = useState('uploading');
	const [disableSubmit, setDisableSubmit] = useState(true);
	const [maxKbSize, setMaxKbSize] = useState(500);
	const [fileValidation, setFileValidation] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [templateStructure, setTemplateStructure] = useState({});

	const handleTextChange = (event) => {
		let newText = event.target.value;
		switch (event.target.id) {
			case 'docName':
				setDocName(newText + '.docx');
				break;
			default:
				break;
		}
	};

	const handleChangeFile = async (event) => {
		let isFileValid = validateFile(event.target.files[0]);
		setFile(event.target.files[0]);
		setFileExists(true);
		setDisableSubmit(!isFileValid);
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('file', file);
		formData.append('fileName', docName);
		let data = await postNewDocument(formData);
		setFileUploadStatus('complete');
		setTemplateStructure(data);
		setIsModalOpen(true);
	};

	const handleDeleteFile = (event) => {
		setFileExists(false);
		setDisableSubmit(true);
	};

	const validateFile = (currentFile) => {
		let isValid = true;
		let size = currentFile.size;
		let currentValidation = {};
		if (currentFile.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
			currentValidation.invalid = true;
			currentValidation.errorSubject = 'Tipo de archivo incorrecto';
			currentValidation.errorBody = 'Solo se permiten archivos .docx';
			isValid = false;
		}
		if (size / 1024 > maxKbSize) {
			currentValidation.invalid = true;
			currentValidation.errorSubject = 'Limite de Peso';
			currentValidation.errorBody = `El máximo peso es de ${maxKbSize} kB`;
			isValid = false;
		}
		setFileUploadStatus('edit');
		setFileValidation(currentValidation);

		return isValid;
	};

	const getFileDescription = () => {
		return (
			<FileUploaderItem
				name={file.name}
				invalid={fileValidation.invalid}
				errorSubject={fileValidation.errorSubject}
				errorBody={fileValidation.errorBody}
				status={fileUploadStatus}
				onDelete={handleDeleteFile}
			/>
		);
	};

	return (
		<>
			<Form onSubmit={onSubmitHandler}>
				<Stack gap={7}>
					<TextInput id="docName" labelText="Nombre" onChange={handleTextChange} required />

					<FormItem>
						<p className="cds--file--label">Elegir archivo</p>
						<p className="cds--label-description">Max {maxKbSize} kB. Solo acepta archivos .docx</p>
						<FileUploaderDropContainer
							accept={['.docx']}
							innerRef={{
								current: '[Circular]',
							}}
							labelText="Arrastra un archivo o da click para seleccionarlo"
							multiple={false}
							name=""
							onAddFiles={handleChangeFile}
							onChange={handleChangeFile}
							tabIndex={0}
						/>
						{fileExists ? getFileDescription() : null}
						<div className="cds--file-container cds--file-container--drop" />
					</FormItem>
					<Button type="submit" disabled={disableSubmit}>
						Enviar
					</Button>
				</Stack>
			</Form>
			<TemplateFieldsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} templateData={templateStructure} />
		</>
	);
};

export default UploadFile;
