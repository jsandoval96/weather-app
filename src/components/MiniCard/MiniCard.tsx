import { Box, makeStyles } from '@material-ui/core';
import { ReactElement } from 'react';

interface MiniCardProps {
  title: string;
  value?: number | string;
  type: string;
  children?: ReactElement;
}

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    background: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
  },
  title: {
    fontFamily: 'Raleway',
    textAlign: 'center',
    paddingTop: '15px'
  },
  value: {
    textAlign: 'center',
    fontFamily: 'Raleway',
    fontSize: '3rem',
    fontWeight: 'bold'
  },
  type: {   
    fontFamily: 'Roboto',
    fontSize: '1.5rem',
    fontWeight: 'normal',
    marginLeft: '5px'
  },
  content: {
    padding: '1rem 2.5rem',
    textAlign: 'center'
  }
}));

const MiniCard = ({ title, value, type, children }: MiniCardProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.container} py={1} borderRadius={3}>
      <Box className={classes.title}>
        {title}
      </Box>
      <Box className={classes.value}>
        {value}<span className={classes.type}>{type}</span>
      </Box>
      <Box className={classes.content}>
        {children}
      </Box>
    </Box>
  );
};

export default MiniCard;
