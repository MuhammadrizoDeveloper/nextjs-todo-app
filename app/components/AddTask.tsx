"use client";

import { FiPlus, FiPlusCircle } from "react-icons/fi";
import Modal from './Modal';
import { FormEventHandler, useState } from 'react';
import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue
    });
    setNewTaskValue("");
    setAddModalOpen(false);
    router.refresh();
  }

  return (
    <div>
      <button className="btn btn-primary w-full" onClick={() => setAddModalOpen(true)}>
        Add New Task<FiPlusCircle size={18} />
      </button>
      <Modal modalOpen={addModalOpen} setModalOpen={setAddModalOpen}>
        <form onSubmit={handleNewTodo}>
          <h3 className="font-bold text-lg">Add New Task</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={e => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary">
              <FiPlusCircle size={18} />
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
};

export default AddTask;