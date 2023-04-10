import React from 'react';
import { SideNav, SideNavItems, SideNavLink, SideNavMenu, SideNavMenuItem } from '@carbon/react';
import { IbmWatsonKnowledgeCatalog, Help, DocumentSigned, Home } from '@carbon/react/icons';

const HelpIcon = () => <Help size={16} />;
const NotebookIcon = () => <IbmWatsonKnowledgeCatalog size={16} />;
const DocumentSignedIcon = () => <DocumentSigned size={16} />;
const HomeIcon = () => <Home size={16} />;

const SideMenu = () => (
	<>
		<SideNav aria-label="Side navigation" isRail>
			<SideNavItems>
				<SideNavLink renderIcon={HomeIcon} href="/">
					Home
				</SideNavLink>
				<SideNavMenu renderIcon={NotebookIcon} title="Templates">
					<SideNavMenuItem href="/templates">Upload Template</SideNavMenuItem>
				</SideNavMenu>
				<SideNavMenu renderIcon={DocumentSignedIcon} title="Documentos">
					<SideNavMenuItem href="/documentos">Crear Documento</SideNavMenuItem>
				</SideNavMenu>
				<SideNavLink renderIcon={HelpIcon} to="javascript:void(0)">
					Soporte
				</SideNavLink>
			</SideNavItems>
		</SideNav>
	</>
);

export default SideMenu;
