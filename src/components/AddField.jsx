import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from 'react';

export const AddField = ( {onClickAdd} ) => {
  const [input , setInput] = React.useState('')
  const [checked , setCheked] = React.useState(false)

  const addTask = () => {
    onClickAdd(input,checked)
    setInput('')
    setCheked(false)
  }

  return (
    <div className="field">
      <Checkbox
        checked={checked} 
        onClick={() => { setCheked(!checked)}}
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
      <TextField value={input} onChange={(e) => {setInput(e.target.value)}} placeholder="Введите текст задачи..." variant="standard" fullWidth />
      <Button onClick={addTask}>
        <AddIcon />
      </Button>
    </div>
  );
};
