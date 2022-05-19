import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';
import React from 'react';

function App() {
  const [tab, setTab] = React.useState(0)
  const [selected , setSelected] = React.useState(false)
  const [state, dispatch] = React.useReducer(reducer, []);
  const [content, setContent] = React.useState(state)

  React.useEffect(() => {
    let count = 0 ;
    state.forEach(item => {
      if (item.completed === true) {
        count +=1
      }
    })
    if (count === state.length){ 
      setSelected(true)
    } else {
      setSelected(false)
    }

    if(tab === 0) {
      setTab(0)
      setContent(state)
    } else if (tab === 1) {
      setTab(1)
      setContent(state.filter((item)=> item.completed === false))
    } else if (tab === 2) {
      setTab(2)
      setContent(state.filter((item)=> item.completed === true))
    }

  },[state])

  function reducer (state, action) {
    switch (action.type) {
      case 'ADD_TASK':
        return [...state,
          {
            id: state.length !== 0 ? state[state.length - 1].id + 1 : 1,
            text: action.payload.text , 
            completed : action.payload.completed
          }
        ];
      case 'DELETE_TASK':
          return state.filter(item => item.id !== action.payload.id)
      case 'TOGGLE_TASK':
          return state.map((item) => {
            if (item.id === action.payload.id){
              return {
                ...item,
                completed: !item.completed
              }
            }
            return item
          } )
      case 'CLEAR_TASK':
        return []
      case 'SELECT_ALL':
        if (selected === true){
          return state.map(item => {
            return {
              ...item,
              completed : false
            }
          })
        } else {
          return state.map(item => {
            return {
              ...item,
              completed : true
            }
          })
        }
      default:
        return []
    }
  }

  const addTask = ( input , checked ) => {
    if(input === '') {
      window.alert('Введите текст задачи')
    } else {
      dispatch({
        type: "ADD_TASK",
        payload: {
          text : input,
          completed: checked
        }
      })
    }
    
  }

  const removeTask = ( id ) => {
    if (window.confirm('Вы точно хотите удалить это задание?')){
      dispatch({
        type: "DELETE_TASK",
        payload: {
          id
        }
      })
    }
  }

  const toggleTask = (id) => {
    dispatch({
      type: "TOGGLE_TASK",
      payload: {
        id
      }
    })
  }

  const selectAll = () => {
    dispatch({
      type: "SELECT_ALL"
    })
  }

  const clear = () => {
    if (window.confirm('Вы точно хотите удалить все заданиея?')){
      dispatch({
        type: "CLEAR_TASK"
      })
    }
    setTab(0)
  }

  const tabAll = () => {
    setTab(0)
    setContent(state)
  }

  const tabActive = () => {
    setTab(1)
    setContent(state.filter((item)=> item.completed === false))
  }

  const tabCompleted = () => {
    setTab(2)
    setContent(state.filter((item)=> item.completed === true))
  }

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onClickAdd={addTask}/>
        <Divider />
        <Tabs value={tab}>
          <Tab onClick={tabAll} label="Все" />
          <Tab onClick={tabActive} label="Активные" />
          <Tab onClick={tabCompleted} label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {content.map(({ id , text , completed }) => (
            <Item key = {id + text} toggleTask = {() => toggleTask(id)} id={id} text = {text} completed = {completed} onClickRemove={() => removeTask(id)}/>
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={selectAll}>{selected === true ? 'Снять отметки' : 'Отметить всё'}</Button>
          <Button onClick={clear}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
