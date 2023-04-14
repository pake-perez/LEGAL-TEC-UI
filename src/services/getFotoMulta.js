import axios from 'axios';

export const getFotoMulta = async (formData) => {
	try {
		const { data } = await axios.post('/api/fotomulta', formData, {
			responseType: 'blob',
		});
		console.log(data);
		return data;
	} catch (error) {
		console.error(error.message);
	}
};
