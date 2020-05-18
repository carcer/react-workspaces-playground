/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Menu from 'material-ui-popup-state/HoverMenu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { usePopupState, bindHover, bindMenu } from 'material-ui-popup-state/hooks';
import { Theme } from '@material-ui/core';
import { MenuItemOptions, ParentPopupState } from './types';

const submenuStyles = (theme: Theme) => ({
	menu: {
		top: theme.spacing(-1),
	},
	title: {
		flexGrow: 1,
	},
	moreArrow: {
		marginRight: theme.spacing(-1),
	},
});

type SubmenuStyles = {
	title: string;
	moreArrow: string;
	menu: string;
};

export const Submenu = withStyles(submenuStyles)(
	// Unfortunately, MUI <Menu> injects refs into its children, which causes a
	// warning in some cases unless we use forwardRef here.
	React.forwardRef(
		(
			{
				classes,
				title,
				id: popupId,
				items,
				children,
				onClick,
				...props
			}: {
				classes: SubmenuStyles;
				title: string | React.ReactNode | Element;
				id: string;
				items?: MenuItemOptions[];
				children?: React.ReactNode;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				onClick?: any;
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			ref: any,
		) => {
			const parentPopupState = React.useContext(ParentPopupState);
			const popupState = usePopupState({
				popupId,
				variant: 'popover',
				parentPopupState,
			});
			return (
				<ParentPopupState.Provider value={popupState}>
					<MenuItem
						{...bindHover(popupState)}
						selected={popupState.isOpen}
						ref={ref}
						onClick={e => onClick && onClick(e, parentPopupState)}
					>
						<ListItemText className={classes.title}>{title}</ListItemText>
						<ChevronRight className={classes.moreArrow} />
					</MenuItem>
					<Menu
						{...bindMenu(popupState)}
						className={classes.menu}
						anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
						transformOrigin={{ vertical: 'top', horizontal: 'left' }}
						getContentAnchorEl={null}
						{...props}
					>
						{(items &&
							items.map((item: MenuItemOptions) => {
								if (!item.children) {
									return (
										<MenuItem
											onClick={e => item.onClick && item.onClick(e, popupState)}
											key={`${item.key || item.text}submenu`}
										>
											{item.text}
										</MenuItem>
									);
								}

								return (
									<Submenu
										id={`${item.key || item.text}popid`}
										key={`${item.key || item.text}submenu`}
										title={item.text}
										items={item.children}
									/>
								);
							})) ||
							children}
					</Menu>
				</ParentPopupState.Provider>
			);
		},
	),
);

export default Submenu;