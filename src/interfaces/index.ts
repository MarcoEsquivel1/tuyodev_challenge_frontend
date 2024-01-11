export interface TaskInterface {
    id: number;
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
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}

export interface TasksProps {
    tasks: TaskInterface[];
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}