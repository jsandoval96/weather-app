import { InputAdornment, IconButton, TextField, makeStyles } from '@material-ui/core';
import { Search, MyLocation } from '@material-ui/icons';
import { useState } from 'react';

interface SearchFieldProps {
  defaultValue: string;
  onSubmit: (val: string) => void;
  onSubmitLocation: () => void;
  error: boolean;
  errorMessage: string;
  placeholder: string;
}

const useStyles = makeStyles({
  input: {
    borderRadius: '30px',
    '& > div > fieldset': {
      borderRadius: '30px'
    },
  },
});

const SearchField = ({ defaultValue, onSubmit, onSubmitLocation, error, errorMessage, placeholder }: SearchFieldProps) => {
  const classes = useStyles();
  const [location, setLocation] = useState<string>(defaultValue);

  return (
    <TextField 
      name="email"
      variant="outlined"
      placeholder={placeholder}
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      fullWidth
      size="small"
      error={error}
      helperText={error && errorMessage}
      className={classes.input}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small" onClick={() => location && onSubmit(location)} role="submit" >
              <Search />
            </IconButton>
            <IconButton size="small" onClick={onSubmitLocation} role="location" >
              <MyLocation />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
