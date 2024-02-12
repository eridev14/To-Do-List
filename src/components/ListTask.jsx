import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
export const ListTask = ({
    task,
    setShowModal,
    setEditText,
    handleDeleteClick,
    setCheckbox
}) => {
    const { message, id, done } = task;
    const [check, setCheck] = useState(done);
    const [classLi, setClassLi] = useState(true)
    console.log(check);

    return (
        <li className={
            `task-list__item task ${classLi ? 'task--on ' : 'task--delete'
            }`}>
            <input
                type="checkbox"
                name="check"
                id={`check - box - ${id} `}
                checked={check}
                className='task__check'
                onChange={() => {
                    let newCheck = !check;
                    setCheck(newCheck)
                    setCheckbox(id, newCheck)
                }}
            />

            <label className='task__label' htmlFor={`check-box-${id} `}>
                <span className={
                    !check ? 'task__text' : 'task__text--check'
                }>
                    {message}
                </span>
            </label>

            <button
                className='task__btn task__btn--edit'
                onClick={() => {
                    const newEdit = {
                        idEdit: id,
                        messageEdit: message
                    }
                    setEditText(newEdit);
                    setShowModal(true)
                }}
            >
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button
                className='task__btn task__btn--delete'
                onClick={() => {
                    setClassLi(!classLi)
                    setTimeout(() => {
                        handleDeleteClick(id)
                    }, 600)
                }}
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>

        </li>
    )
}
