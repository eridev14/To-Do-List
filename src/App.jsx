import { useState } from 'react';
import './App.css'
import { AddTask } from './components/AddTask';
import ModalContent from './components/Modal';
import { createPortal } from "react-dom";
import { ListTask } from './components/ListTask';
import { useLocalStorage } from './hooks/useLocalStorage';


function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [messageError, setMessageError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editText, setEditText] = useState({});

  function handleDeleteClick(id) {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }

  function handleEditClick(id, textEdit) {
    const editTask = tasks.map(task => {
      if (task.id === id) {
        return { ...task, message: textEdit }
      } else {
        return task
      }
    })

    setTasks(editTask);
  }

  function setCheckbox(id, checkOn) {
    let newCheck = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          done: checkOn
        }
      } else {
        return task
      }
    })

    setTasks(newCheck)
  }

  return (
    <div className="container">
      {showModal && createPortal(
        <ModalContent
          text={editText}
          setText={setEditText}
          setShowModal={setShowModal}
          handleEditClick={handleEditClick}
        />, document.body
      )}

      <header className="header">
        <h2 className="header__title">
          To Do List
        </h2>
      </header>

      <AddTask
        errorMessage={setMessageError}
        tasks={tasks}
        setTasks={setTasks}
      />

      <div className="delete-all">
        <button
          className='delete-all__btn'
          onClick={() => {
            setTasks([])
          }}
        >
          Borrar Todo
        </button>
      </div>

      <span className="error-message">
        {messageError}
      </span>

      <main className="task-list">
        <ul className='task-list__ul'>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <ListTask
                key={task.id}
                task={task}
                setShowModal={setShowModal}
                handleDeleteClick={handleDeleteClick}
                setEditText={setEditText}
                setCheckbox={setCheckbox}
              />
            ))
          ) : (
            <p className='task-list__no-list'>No hay tareas disponibles.</p>
          )}
        </ul>
      </main>


    </div>
  )

}

export default App
