import axios from 'axios';

let mockData = {
	name: 'Pake Perez',
	model: 'Prius',
	plate: 'ACCA-173',
};

export const getFotoMulta = async (formData) => {
	try {
		const { data } = await axios.post('/api/fotomulta', formData, { responseType: 'blob' });
		console.log(data);
		return data;
	} catch (error) {
		console.error(error.message);
	}
};
