import { useState, useEffect } from 'react'
import { GlobalStyle, theme } from "./styles";
import styled from "styled-components";

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('tasks')
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  const addTask = () => {
    if (!inputValue.trim()) return
    setTasks(prev => [
      ...prev,
      { id: Date.now(), text: inputValue.trim(), completed: false }
    ])
    setInputValue('')
  }

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const clearTasks = () => {
    setTasks([])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask()
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>Task List</Header>

        <InputSection>
          <TaskInput
            type="text"
            placeholder="Add a new task…"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <AddButton onClick={addTask}>Add</AddButton>
        </InputSection>

        <TaskBoard>
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              completed={task.completed}
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </TaskItem>
          ))}
        </TaskBoard>

        <ClearButton onClick={clearTasks}>Clear All</ClearButton>
      </AppContainer>
    </>
  )
}

export default App

/* ------- Styled Components ------- */

const AppContainer = styled.div`
  padding: 1rem;
  width: 250px;
`

const Header = styled.div`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: bold;
`

const InputSection = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const TaskInput = styled.input`
  flex: 1;
  padding: 0.4rem;
  border: 1px solid ${theme.border};
  border-radius: 4px;

  font-family: "Sour Gummy", sans-serif;
  font-size: 12px;

  &::placeholder {
    font-family: "Sour Gummy", sans-serif;
    font-size: 12px;
    color: #aaa;
    opacity: 1;
`

const AddButton = styled.button`
  padding: 0.4rem 0.7rem;
  border: none;
  background-color: ${theme.border};
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: ${theme.border};
    background-color: ${theme.shadow};
  }
`

const TaskBoard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const TaskItem = styled.div`
  padding: 0.5rem;
  border-radius: 4px;
  background-color: ${({ completed }) => (completed ? '#ddd' : '#f1f1f1')};
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  opacity: ${({ completed }) => (completed ? 0.6 : 1)};

  &:hover {
    background-color: #e4e4e4;
  }
`

const ClearButton = styled(AddButton)`
  width: 100%;
  margin-top: 1rem;
  background-color: #ffb8b0;

  &:hover {
    background-color: #e7978f;
    color: white;
  }
`