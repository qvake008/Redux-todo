import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';
import React from 'react';

function App() {
  const [state, dispatch] = React.useReducer(reducer, [
    {
      id: 1,
      text: "Task 1" , 
      completed : false
    }
  ]);

  function reducer (state, action) {
    switch (action.type) {
      case 'ADD_TASK':
        return [...state,
          {
            id: state[state.length - 1].id + 1,
            text: action.payload.text , 
            completed : action.payload.completed
          }
        ];
      case 'DELETE_TASK':
        if (window.confirm('Вы точно хотите удалить это задание?')){
          return state.filter(item => item.id !== action.payload.id && item.text !== action.payload.text)
        }else {
          return state
        }
      default:
        return state
    }
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

  const removeTask = ( id , text ) => {
    dispatch({
      type: "DELETE_TASK",
      payload: {
        id,
        text
      }
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
            <Item key = {id + text} id={id} text = {text} completed = {completed} oClickRemove={removeTask}/>
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
