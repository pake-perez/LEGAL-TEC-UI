import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu';
import { Content } from '@carbon/react';
import DocumentForm from './components/DocumentForm/DocumentForm';
import './App.scss';

function App() {
	return (
		<div className="App">
			<>
				<Navbar />
				<SideMenu />
				<Content>
					<DocumentForm />
				</Content>
			</>
		</div>
	);
}

export default App;
