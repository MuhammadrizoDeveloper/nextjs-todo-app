"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setEditModalOpen(false);
    router.refresh();
  }

  const handleDeleteTodo= async (id: string) => {
    await deleteTodo(id);
    setDeleteModalOpen(false);
    router.refresh();
  }

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit
          className="text-blue-500"
          onClick={() => setEditModalOpen(true)}
          cursor="pointer"
          size={20}
        />
        <Modal modalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
          <form onSubmit={handleEditTodo}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          className="text-red-500"
          onClick={() => setDeleteModalOpen(true)}
          cursor="pointer"
          size={20}
        />
        <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}>
          <h3 className="font-bold text-lg">Delete Task</h3>
          <div className="flex flex-col justify-between modal-action">
            <h4 className="text-lg text-left">Are you sure you want to delete this task?</h4>
            <div className="flex self-end gap-2">
              <button
                className="btn btn-primary text-white mt-5"
                onClick={() => setDeleteModalOpen(false)}>
                No
              </button>
              <button
                className="btn btn-error bg-red-500 text-white mt-5"
                onClick={() => handleDeleteTodo(task.id)}>
                Yes
              </button>
            </div>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
