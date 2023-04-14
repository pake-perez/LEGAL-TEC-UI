import axios from 'axios';

export const putTemplateStructure = async (templateData) => {
	try {
		const { data } = await axios.put('/api/template/structure', templateData);
		return data;
	} catch (error) {
		console.error(error.message);
	}
};
