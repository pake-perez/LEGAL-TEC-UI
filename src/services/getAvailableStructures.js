import axios from 'axios';

export const getAvailableStructures = async (user) => {
	try {
		const { data } = await axios.get(`https://8axj0goh72.execute-api.us-east-1.amazonaws.com/staging/api/template/structure?user=${user}`);
		return data;
	} catch (error) {
		console.error(error.message);
	}
};