import axios from 'axios';

let mockData = {
	name: 'Pake Perez',
	model: 'Prius',
	plate: 'ACCA-173',
};

export const getFotoMulta = async (formData) => {
	try {
		const { data } = await axios.post('http://digilegal-api-dev.us-east-1.elasticbeanstalk.com/api/fotomulta', formData, { responseType: 'blob' });
		console.log(data);
		return data;
	} catch (error) {
		console.error(error.message);
	}
};
