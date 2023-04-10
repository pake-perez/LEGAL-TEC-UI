import axios from 'axios';

export const postNewDocument = async (formData) => {
	try {
		const { data } = await axios.post('https://8axj0goh72.execute-api.us-east-1.amazonaws.com/staging/api/upload/template', formData, {
			responseType: 'blob',
		});
		console.log(data);
		return data;
	} catch (error) {
		console.error(error.message);
	}
};
