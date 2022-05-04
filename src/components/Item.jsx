import React from 'react';
import { IconButton, Checkbox, ListItem, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const Item = ({ id , text , completed , oClickRemove }) => {
  const [checked , setCheked] = React.useState(completed)

  return (
    <ListItem>
      <div className="d-flex item">
        <Checkbox checked={checked} onChange={() => { setCheked(!checked)}} icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />}/>
        <Typography className="item-text">{text}</Typography>
        <div className="item-buttons d-flex">
          <IconButton>
            <EditIcon style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={()=>oClickRemove(id)}>
            <DeleteOutlineIcon style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>
    </ListItem>
  );
};
