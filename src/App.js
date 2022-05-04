import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';
import React from 'react';

function App() {
  const [state, dispatch] = React.useReducer(reducer, []);

  function reducer (state, action) {
    if (action.type === 'ADD_TASK') {
      return [...state,
        {
          id: state.length ,
          text: action.payload.text , 
          completed : action.payload.completed
        }
      ]
    }

    if (action.type === 'DELETE_TASK' && window.confirm('Вы точно хотите удалить это задание?')) {
      return state.filter(item => item.id !== action.payload)
    }

    return state
  }

  const addTask = ( input , checked ) => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        text : input,
        completed: checked
      }
    })
  }

  const removeTask = ( id ) => {
    dispatch({
      type: "DELETE_TASK",
      payload: id
    })
  }

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onClickAdd={addTask}/>
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map(({ id , text , completed }) => (
            <Item key = {id} id={id} text = {text} completed = {completed} oClickRemove={removeTask}/>
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
