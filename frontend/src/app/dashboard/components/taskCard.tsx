'use client'
import { TaskCardProps } from "@/types/task";
import { taskService } from "@/services/taskService";
import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "lucide-react";
import Tooltip from '@/components/Tooltip'
import EditTaskModal from './EditTaskModal';
import Notification from '@/components/ui/Notification';
import { motion } from "framer-motion";

export default function TaskCard({ _id, title, description, completed: initialCompleted, createdAt, onTaskUpdate, onTaskDelete }: Readonly<TaskCardProps>) {
    const [isCompleted, setIsCompleted] = useState(initialCompleted);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        title: title,
        description: description
    });
    const [notification, setNotification] = useState<{
        show: boolean;
        type: 'success' | 'error';
        message: string;
    }>({
        show: false,
        type: 'success',
        message: ''
    });

    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const handleToggleComplete = async () => {
        try {
            setIsCompleted(!isCompleted);
            if (!isCompleted) {
                await taskService.completeTask(_id);
                setNotification({
                    show: true,
                    type: 'success',
                    message: 'Tarea completada exitosamente'
                });
            } else {
                await taskService.unCompleteTask(_id);
                setNotification({
                    show: true,
                    type: 'success',
                    message: 'Tarea marcada como incompleta'
                });
            }
            await onTaskUpdate();
        } catch (error) {
            setIsCompleted(isCompleted);
            console.error('Error al actualizar la tarea:', error);
        }
    };

    const handleDeleteTask = async () => {
        try {
            await taskService.deleteTask(_id);
            setNotification({
                show: true,
                type: 'success',
                message: 'Tarea eliminada exitosamente'
            });
            setTimeout(() => {
                onTaskDelete();
            }, 500);
        } catch (error) {
            setNotification({
                show: true,
                type: 'error',
                message: 'Error al eliminar la tarea'
            });
            console.error('Error al eliminar la tarea:', error);
        }
    };

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditForm({ title, description });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await taskService.updateTask(_id, editForm);
            setNotification({
                show: true,
                type: 'success',
                message: 'Tarea actualizada exitosamente'
            });
            setIsModalOpen(false);
            setTimeout(() => {
                onTaskUpdate();
                
            }, 500);
        } catch (error) {
            setNotification({
                show: true,
                type: 'error',
                message: 'Error al actualizar la tarea'
            });
            console.error('Error al actualizar la tarea:', error);
        }
    };

    return (
        <>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 flex flex-col sm:flex-row items-center rounded-md shadow-md gap-4 sm:gap-8"
            >
                <div className="w-full sm:w-auto sm:pl-4">
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={handleToggleComplete}
                        className="h-6 w-6 text-blue-500"
                    />
                </div>
                <div className="flex flex-col w-full sm:w-[45%] text-center sm:text-left">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>

                <p className={`text-sm w-full sm:w-[12%] text-center font-bold text-white p-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-red-500'}`}>
                    {isCompleted ? 'Completed' : 'Incomplete'}
                </p>

                <p className="text-sm text-gray-600 w-full sm:w-auto text-center">
                    {new Date(createdAt).toLocaleDateString()}
                </p>

                <div className="flex flex-row justify-center gap-2 w-full sm:w-auto">
                    <Tooltip text="Edit task" position="top">
                        <button
                            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 hover:scale-110 transition-all duration-300"
                            onClick={handleEditClick}
                        >
                            <PencilIcon className="w-6 h-6" />
                        </button>
                    </Tooltip>
                    <Tooltip text="Delete task" position="top">
                        <button
                            className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 hover:scale-110 transition-all duration-300"
                            onClick={handleDeleteTask}
                        >
                            <TrashIcon className="w-6 h-6" />
                        </button>
                    </Tooltip>
                </div>
            </motion.div>
            <EditTaskModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                formData={editForm}
                onInputChange={handleInputChange}
            />
            <Notification
                isVisible={notification.show}
                type={notification.type}
                message={notification.message}
                onClose={() => setNotification(prev => ({ ...prev, show: false }))}
            />
        </>
    )
}