import { useState, useEffect } from "react";
import { TaskInterface } from "../interfaces";

const useFilteredTasks = (tasks: TaskInterface[], searchTerm: string) => {
    const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>(tasks);

    useEffect(() => {
        const timerId = setTimeout(() => {
            const filtered = tasks.filter(
                (task) =>
                    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    task.date.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredTasks(filtered);
        }, 500);

        return () => clearTimeout(timerId);
    }, [searchTerm, tasks]);

    useEffect(() => {
        const filtered = tasks.filter(
            (task) =>
                task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.date.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTasks(filtered);
    }, [tasks]);

    return filteredTasks;
};

export default useFilteredTasks;
