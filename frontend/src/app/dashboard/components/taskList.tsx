'use client'
import { useEffect, useState } from 'react';
import { taskService } from '@/services/taskService';
import { Task } from '@/types/task';
import TaskCard from './taskCard';
import AddTaskModal from './AddTaskModal';
import { PlusIcon } from 'lucide-react';
import Notification from '@/components/ui/Notification';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const [formData, setFormData] = useState({
    title: '',
    description: ''
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

  const loadTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await taskService.createTask(formData);
      setShowForm(false);
      setFormData({ title: '', description: '' });
      loadTasks();
      setNotification({
        show: true,
        type: 'success',
        message: 'Tarea creada exitosamente'
      });
    } catch (error) {
      console.error('Error creating task:', error);
      setNotification({
        show: true,
        type: 'error',
        message: 'Error al crear la tarea'
      });
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-600 font-semibold">Cargando tareas...</p>
    </div>
  );

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[850px] mx-auto px-4 sm:px-6 md:px-8 my-4 sm:my-[50px] min-h-[80vh]">
      <Notification
        isVisible={notification.show}
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl sm:text-2xl font-bold">Task List</h1>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base transition-all duration-200 transform 
              ${filter === 'all' 
                ? 'bg-blue-500 text-white scale-105 shadow-md' 
                : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base transition-all duration-200 transform 
              ${filter === 'completed' 
                ? 'bg-green-500 text-white scale-105 shadow-md' 
                : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Completadas
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base transition-all duration-200 transform 
              ${filter === 'pending' 
                ? 'bg-red-500 text-white scale-105 shadow-md' 
                : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 self-end rounded bg-blue-500 text-white 
              transition-all duration-200 hover:bg-blue-600 hover:scale-105 hover:shadow-md"
          >
            <PlusIcon className="" />
          </button>
        </div>
      </div>

      <ul className="flex flex-col gap-4 min-h-[400px] sm:min-h-[500px]">
        {currentTasks.length === 0 && (
          <p className="text-gray-600 font-semibold">No hay tareas {filter === 'completed' ? 'completadas' : 'pendientes'}</p>
        )}
        {currentTasks.map((task) => (
          <TaskCard
            key={task._id + task.title}
            {...task}
            onTaskUpdate={loadTasks}
            onTaskDelete={loadTasks}
          />
        ))}
      </ul>

      <div className="">
        {filteredTasks.length > tasksPerPage && (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2 sm:px-3 py-1 rounded text-sm sm:text-base ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Anterior
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-2 sm:px-3 py-1 rounded text-sm sm:text-base ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-2 sm:px-3 py-1 rounded text-sm sm:text-base ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      <AddTaskModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        formData={formData}
        onInputChange={handleInputChange}
      />
    </div>
  );
}       