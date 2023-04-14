import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const defaultConfig = {
	plugins: [react()],
	resolve: {
		alias: {
			'./runtimeConfig': './runtimeConfig.browser',
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				'.js': 'jsx',
			},
		},
	},
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	if (command === 'serve') {
		console.log(mode);
		const isDev = mode === 'development';
		return {
			...defaultConfig,
			server: {
				port: 3000,
				strictPort: true,
				proxy: {
					'/api': {
						target: isDev ? 'http://localhost:3001' : 'https://8axj0goh72.execute-api.us-east-1.amazonaws.com/staging',
						changeOrigin: isDev,
						secure: !isDev,
					},
				},
			},
		};
	} else {
		return defaultConfig;
	}
});
