import { useRef, useState } from "react";

export const AddTask = ({ errorMessage, tasks, setTasks }) => {
  const [text, setText] = useState('');
  const idNext = useRef(lastIdTasks())

  function lastIdTasks() {
    if (tasks.length === 0) return 0
    return tasks.slice(-1)[0].id
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleAddClick(e) {
    if (text === '') {
      errorMessage('el texto no debe estar vacio')
      return
    }
    setTasks([
      ...tasks,
      {
        id: idNext.current++,
        message: text,
        done: false
      }
    ])
    setText('')
    errorMessage('')
  }

  // function debounce(fn, delay) {
  //   let timer;
  //   return function () {
  //     clearTimeout(timer)
  //     timer = setTimeout(() => fn.apply(this, arguments), delay)
  //   }
  // }

  // let textDebounce = debounce(setText, 1000);

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name='text-inp'
          className='form__inp-task'
          placeholder='agrega una tarea...'
          value={text}
          onChange={(e) => {
            let value = e.target.value
            setText(value)
          }}
          autoFocus
        />
        <button
          type='submit'
          className='form__btn'
          onClick={handleAddClick}
        >Guardar</button>
      </form>
    </>
  )
}
