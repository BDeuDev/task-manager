'use client'
import { Task } from "@/types/task";

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
    formData: Omit<Task, '_id' | 'completed' | "createdAt" | "updatedAt">;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function AddTaskModal({ isOpen, onClose, onSubmit, formData, onInputChange }: AddTaskModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl w-[480px] shadow-xl">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Task</h2>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Titulo de la tarea"
                            value={formData.title}
                            onChange={onInputChange}
                            className="mt-1 p-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            placeholder="Descripcion de la tarea"
                            value={formData.description}
                            onChange={onInputChange}
                            className="p-2 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                            rows={4}
                        />
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 