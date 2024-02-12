import { useState } from 'react'
import './Modal.css'

const ModalContent = ({
  text,
  setText,
  setShowModal,
  handleEditClick
}) => {
  const [value, setValue] = useState(text);
  const { idEdit, messageEdit } = value;
  
  const handleChange = (e) => {
    setValue({
      ...value,
      messageEdit: e.target.value
    });
  };

  const handleGuardar = () => {
    setText(messageEdit);
    handleEditClick(idEdit, messageEdit)
    setShowModal(false);
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <input
          type="text"
          value={messageEdit}
          onChange={handleChange}
        />
        <button onClick={handleGuardar}>
          guardar
        </button>
      </div>
    </div>
  );
};

export default ModalContent