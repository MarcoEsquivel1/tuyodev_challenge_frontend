import { Col } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../stores/taskStore";
import { deleteTask, setTaskCompleted } from "../stores/slices/taskSlice";
import { TaskInterface } from "../interfaces";

const AnimatedButton = motion.button;

export const TodoItem = ({ task }: { task: TaskInterface }) => {
    const [completedTask, setCompletedTask] = useState(task.completed);

    const dispatch = useAppDispatch();

    const handleCompleteTask = useCallback(() => {
        dispatch(setTaskCompleted(task.id));
    }, [dispatch, task.id]);

    const deleteTaskHandle = useCallback(() => {
        dispatch(deleteTask(task.id));
    }, [dispatch, task.id]);

    useEffect(() => {
        setCompletedTask(task.completed);
    }, [task.completed]);

    return (
        <div className="d-flex border mt-3 p-0">
            <Col xs={3} className="p-0 m-0">
                <AnimatedButton
                    aria-label="Complete Task"
                    style={{ width: "100%", height: "100%", padding: "0px", borderRadius: "0%" }}
                    className={`btn ${completedTask ? 'btn-success' : 'btn-danger'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCompleteTask}
                >
                    <Icon icon={completedTask ? "material-symbols:check" : "lucide:x"} className="fs-1" />
                </AnimatedButton>
            </Col>

            <Col xs={6} className="text-center p-0 m-0">
                <motion.h5
                    aria-label="Task Description"
                    className={`my-3 ${completedTask ? 'completed-text' : ''}`}
                    style={{ textDecoration: completedTask ? 'line-through' : 'none' }}
                >
                    {task.description}
                </motion.h5>
                <motion.p
                    aria-label="Task Date"
                    className='my-2'
                    style={{ textDecoration: completedTask ? 'line-through' : 'none' }}
                >
                    {task.date}
                </motion.p>
            </Col>

            <Col xs={3} className="p-0 m-0">
                <AnimatedButton
                    aria-label="Delete Task"
                    style={{ width: "100%", height: "100%", padding: "0px", borderRadius: "0%" }}
                    className="btn btn-danger"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={deleteTaskHandle}
                >
                    <Icon icon="akar-icons:trash-can" className="fs-1" />
                </AnimatedButton>
            </Col>
        </div>
    );
};


















