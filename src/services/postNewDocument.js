import axios from 'axios';

export const postNewDocument = async (formData) => {
	try {
		const { data } = await axios.post('https://8axj0goh72.execute-api.us-east-1.amazonaws.com/development/api/upload/template', formData);
		return data;
	} catch (error) {
		console.error(error.message);
	}
};
