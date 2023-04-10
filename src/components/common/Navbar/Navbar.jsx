import React from 'react';
import {
	Header,
	HeaderContainer,
	HeaderName,
	HeaderNavigation,
	HeaderMenuButton,
	HeaderMenuItem,
	HeaderGlobalBar,
	HeaderGlobalAction,
	SkipToContent,
	SideNav,
	SideNavItems,
	HeaderSideNavItems,
} from '@carbon/react';
import { Switcher, Notification, UserAvatar } from '@carbon/react/icons';

const Navbar = () => (
	<HeaderContainer
		render={({ isSideNavExpanded, onClickSideNavExpand }) => (
			<Header aria-label="Digilegal">
				<SkipToContent />
				<HeaderMenuButton aria-label="Open menu" onClick={onClickSideNavExpand} isActive={isSideNavExpanded} />
				<HeaderName href="/" prefix="">
					Digilegal
				</HeaderName>
				<HeaderNavigation aria-label="Digilegal">
					<HeaderMenuItem href="/">Welcome User</HeaderMenuItem>
				</HeaderNavigation>
				{/* <SideNav aria-label="Side navigation" expanded={isSideNavExpanded} isPersistent={true}>
					<SideNavItems>
						<HeaderSideNavItems>
							<HeaderMenuItem href="/repos">Repositories</HeaderMenuItem>
						</HeaderSideNavItems>
					</SideNavItems>
				</SideNav> */}
				<HeaderGlobalBar>
					<HeaderGlobalAction aria-label="Notifications" tooltipAlignment="center">
						<Notification size={20} />
					</HeaderGlobalAction>
					<HeaderGlobalAction aria-label="User Avatar" tooltipAlignment="center">
						<UserAvatar size={20} />
					</HeaderGlobalAction>
					<HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="end">
						<Switcher size={20} />
					</HeaderGlobalAction>
				</HeaderGlobalBar>
			</Header>
		)}
	/>
);

export default Navbar;
