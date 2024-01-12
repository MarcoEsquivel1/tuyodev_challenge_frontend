export interface TaskInterface {
    id: string;
    description: string;
    date: string;
    completed: boolean;
}

export interface TaskFormInterface {
    description: string;
    date: string;
}

export interface TaskProps {
    task: TaskInterface;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export interface TasksProps {
    tasks: TaskInterface[];
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}