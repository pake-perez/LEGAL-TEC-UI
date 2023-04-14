import axios from 'axios';

export const postNewDocument = async (formData) => {
	try {
		const { data } = await axios.post('/api/upload/template', formData);
		return data;
	} catch (error) {
		console.error(error.message);
	}
};
