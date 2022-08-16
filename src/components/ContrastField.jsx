import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContrastField = styled(TextField)(({ theme: { palette } }) => ({
  '.MuiFilledInput-root': {
    color: palette.primary.contrastText,
    backgroundColor: 'rgba(0,0,0,0.09)',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.15)',
    },
    '&::before': {
      borderColor: palette.primary.contrastText,
    },
    '&:hover:not(.Mui-disabled)::before': {
      borderColor: palette.primary.contrastText,
    },
  },
  '.MuiInputLabel-root': {
    color: palette.primary.contrastText,
  },
}));

export default ContrastField;
