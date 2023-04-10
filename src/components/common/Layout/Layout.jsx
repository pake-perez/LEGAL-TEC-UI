import Navbar from '../Navbar';
import SideMenu from '../SideMenu/SideMenu';
import { Content } from '@carbon/react';

function Layout({ children }) {
	return (
		<div className="App">
			<>
				<Navbar />
				<SideMenu />
				<Content>
					<main>{children}</main>
				</Content>
			</>
		</div>
	);
}

export default Layout;
