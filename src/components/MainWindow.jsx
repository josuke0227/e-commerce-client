import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { drawerWidth } from "./SideBar";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "-webkit-fill-available",
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,

    [theme.breakpoints.up("sm")]: {
      minHeight: "100vh",
    },
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const MainWindow = ({ children, open }) => {
  const classes = useStyles();

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <div className={classes.drawerHeader} />
      {children}
    </main>
  );
};

export default MainWindow;
