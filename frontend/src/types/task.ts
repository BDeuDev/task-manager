export interface Task {
    _id: string | number;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string | Date;
}
export interface TaskCardProps extends Task {
    onTaskUpdate: () => Promise<void>;
    onTaskDelete: () => Promise<void>;
}
export interface NewTask {
    title: string;
    description?: string;
    
}
export interface EditTask extends NewTask {
    _id?: string | number;
}
export interface EditTaskFormData {
    title: string;
    description?: string;
}