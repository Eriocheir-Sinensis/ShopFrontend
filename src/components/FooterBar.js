import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});

export default function FooterBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="联系我们" icon={<ContactSupportIcon />} />
      <BottomNavigationAction label="购物车" icon={<ShoppingCartIcon />} />
      <BottomNavigationAction label="我的" icon={<PermIdentityIcon />} />

    </BottomNavigation>
  );
}
