import IconButton from "@mui/material/IconButton";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

type FormVisibilityButtonProps = {
  toggleVisibility: () => void;
  visibilityOff: boolean;
}


export const FormVisibilityButton = ({
  toggleVisibility,
  visibilityOff,
}: FormVisibilityButtonProps) => (
  <IconButton
    onClick={toggleVisibility}
  >
    {visibilityOff ? (
      <VisibilityOffOutlinedIcon />
    ) : (
      <VisibilityOutlinedIcon />
    )}
  </IconButton>
);
