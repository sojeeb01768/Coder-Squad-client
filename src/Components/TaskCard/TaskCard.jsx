import React, { useState } from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";
import axiosInstance from "../../Global/AxiosInstance";
import DeleteModal from "../DeleteModal/DeleteModal";
import UpdateForm from "../UpdateForm/UpdateForm";
import { FaPen } from "react-icons/fa6";

const TaskCard = ({ task: addedTask, onDelete, onUpdate, fetchTasks }) => {
    const { task, _id } = addedTask;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [updatedTask, setUpdatedTask] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openUpdateModal = () => {
        setUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setUpdateModalOpen(false);
    };

    const handleDelete = async () => {
        try {
            closeModal();
            await axiosInstance.delete(`/tasks/${_id}`);
            onDelete(_id);
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    }

    const handleUpdateTask = async () => {
        try {
            await axiosInstance.put(`/updateTask/${_id}`, { task: updatedTask });
            onUpdate({ ...addedTask, task: updatedTask });
            closeUpdateModal();
            fetchTasks();
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };
    const taskContent = task.split(' ').slice(0, 5).join(' ');
    const showSeeMoreButton = task.split(' ').length > 5;
    return (
        <div className='bg-slate-600/50 cursor-pointer border-y border-slate-800 text-white  p-3'>
            <div className="flex justify-between items-center">
                <div className='flex items-center'>
                    <h1>{taskContent}{showSeeMoreButton && "..."} </h1>
                    {showSeeMoreButton && (
                        <button onClick={openUpdateModal}>see more</button>
                    )}

                </div>
                <div className='flex gap-x-2'>
                    <button onClick={openModal} className="text-2xl text-red-500 hover:text-red-600 duration-300 px-5 p-1">
                        <MdOutlineDeleteOutline />
                    </button>
                    <button onClick={openUpdateModal} className=" hidden md:block text-2xl text-slate-200 hover:text-slate-300 duration-300 px-5 p-1">
                        <FaPen />
                    </button>
                </div>
            </div>
            <DeleteModal isOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete}></DeleteModal>
            <UpdateForm addedTask={addedTask} isOpen={isUpdateModalOpen} closeModal={closeUpdateModal} updatedTask={updatedTask} setUpdatedTask={setUpdatedTask} handleUpdateTask={handleUpdateTask}></UpdateForm>
        </div>
    );
};

export default TaskCard;