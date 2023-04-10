import React from 'react';
import Layout from '../../common/Layout/Layout';
import DocumentForm from '../../DocumentForm/DocumentForm';

export const Documents = () => {
	return (
		<Layout>
			<div>
				<h1>Here you can create a new document </h1>
				<br />
				<br />
				<br />
				<DocumentForm />
			</div>
		</Layout>
	);
};
