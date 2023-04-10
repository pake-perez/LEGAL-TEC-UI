import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../common/Layout/Layout';
import DocumentForm from '../../DocumentForm/DocumentForm';

export const Documents = () => {
	const location = useLocation();

	const getView = () => {
		switch (location.state.view) {
			case 'create':
				return <DocumentForm />;
			default:
				return <h1>Here you can create a new document </h1>;
		}
	};

	return (
		<Layout>
			<div>{getView()}</div>
		</Layout>
	);
};
