import React from 'react';
import { useState } from 'react';
import { postNewDocument } from '../../services/postNewDocument';
import { FormGroup, FormItem, Stack, TextInput, Button, FileUploaderDropContainer, FileUploaderItem } from '@carbon/react';

const UploadFile = () => {
	const [docName, setDocName] = useState('');
	const [file, setFile] = useState(null);
	const [fileExists, setFileExists] = useState(false);
	const [fileUploadStatus, setFileUploadStatus] = useState('uploading');
	const [disableSubmit, setDisableSubmit] = useState(true);

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
		setFile(event.target.files[0]);
		setFileExists(true);
		setFileUploadStatus('edit');
		setDisableSubmit(false);
		console.log(event.target.files[0]);
	};

	const uploadFile = async () => {
		let formData = {
			docName,
			file,
		};
		let data = await postNewDocument(formData);
		console.log(data);
	};

	const handleDeleteFile = (event) => {
		setFileExists(false);
		setDisableSubmit(true);
	};

	const getFileDescription = () => {
		let invalid = false;
		let errorBody = '';
		let errorSubject = '';
		let size = file.size;
		let maxSize = 500 * 1024; //First number is number of accepted kB
		if (file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
			invalid = true;
		}
		if (size > maxSize) {
			invalid = true;
			errorSubject = 'Size Limit';
			errorBody = 'Maximum size of document is 500kb';
		}
		return (
			<FileUploaderItem
				name={file.name}
				invalid={invalid}
				errorBody={errorBody}
				errorSubject={errorSubject}
				status={fileUploadStatus}
				onDelete={handleDeleteFile}
			/>
		);
	};

	return (
		<>
			<FormGroup style={{ maxWidth: '400px' }} legendText="Subir un nuevo template">
				<Stack gap={7}>
					<TextInput onChange={handleTextChange} id="docName" labelText="Nombre" />

					<FormItem>
						<p className="cds--file--label">Upload files</p>
						<p className="cds--label-description">Max file size is 500kb. Supported file types are .jpg and .png.</p>
						<FileUploaderDropContainer
							accept={['.docx']}
							innerRef={{
								current: '[Circular]',
							}}
							labelText="Drag and drop files here or click to upload"
							multiple
							name=""
							onAddFiles={handleChangeFile}
							onChange={handleChangeFile}
							tabIndex={0}
						/>
						{fileExists ? getFileDescription() : null}
						<div className="cds--file-container cds--file-container--drop" />
					</FormItem>
					<Button onClick={uploadFile} disabled={disableSubmit}>
						Submit
					</Button>
				</Stack>
			</FormGroup>
		</>
	);
};

export default UploadFile;
