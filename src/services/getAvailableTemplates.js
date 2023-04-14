import axios from 'axios';

export const getAvailableTemplates = async (user) => {
	try {
		const { data } = await axios.get(`/api/template/structure?user=${user}`);
		return data;
	} catch (error) {
		console.error(error.message);
	}
};
