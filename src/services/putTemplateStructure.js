import axios from 'axios';

export const putTemplateStructure = async (templateData) => {
	try {
		const { data } = await axios.put('https://8axj0goh72.execute-api.us-east-1.amazonaws.com/staging/api/template/structure', templateData);
		return data;
	} catch (error) {
		console.error(error.message);
	}
};
