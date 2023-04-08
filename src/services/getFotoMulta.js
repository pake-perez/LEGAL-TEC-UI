import axios from 'axios';

let mockData = {
	name: 'Pake Perez',
	model: 'Prius',
	plate: 'ACCA-173',
};

export const getFotoMulta = async (formData) => {
	try {
		const { data } = await axios.post('https://8axj0goh72.execute-api.us-east-1.amazonaws.com/staging/api/fotomulta', formData, {
			responseType: 'blob',
		});
		console.log(data);
		return data;
	} catch (error) {
		console.error(error.message);
	}
};
