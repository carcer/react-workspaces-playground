import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import { selectAppName } from '@ocdlimited/abp.react.core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	appBarSpacer: theme.mixins.toolbar,
}));

interface AbpAppBarProps {
	open: boolean;
	onOpen?: any;
	noMenu?: boolean;
	barActions?: any;
}

export const AbpAppBar = ({ open, onOpen, noMenu, barActions }: AbpAppBarProps) => {
	const classes = useStyles();
	const appName = useSelector(selectAppName);

	const BarActions = barActions || (() => <React.Fragment />);

	return (
		<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
			<Toolbar className={classes.toolbar}>
				{!noMenu && (
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={onOpen}
						className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
					>
						<MenuIcon />
					</IconButton>
				)}
				<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
					{appName}
				</Typography>
				{BarActions({})}
			</Toolbar>
		</AppBar>
	);
};

AbpAppBar.defaultProps = {
	open: false,
};

export default AbpAppBar;
