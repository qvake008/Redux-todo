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
          id: state.length+1 , 
          text: action.text , 
          completed : action.completed
        }
      ]
    }

    return state
  }

  const addTask = ( input , checked ) => {
    dispatch({
      type: "ADD_TASK",
      text: input,
      completed : checked
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
            <Item key = {id} text = {text} completed = {completed}/>
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
