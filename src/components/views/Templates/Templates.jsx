import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../common/Layout/Layout';
import UploadFile from '../../UploadFile/UploadFile';

export const Templates = () => {
	const location = useLocation();

	const getView = () => {
		switch (location.state.view) {
			case 'upload':
				return <UploadFile />;
			default:
				return null;
		}
	};
	return <Layout>{getView()}</Layout>;
};
