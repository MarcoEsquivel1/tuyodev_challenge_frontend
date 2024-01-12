import { Col } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../stores/taskStore";
import { deleteTask } from "../stores/slices/taskSlice";
import { TaskInterface } from "../interfaces";

const AnimatedButton = motion.button;

export const TodoItem = ({ task }: { task: TaskInterface }) => {
    const [completedTask, setCompletedTask] = useState(task.completed);

    const dispatch = useAppDispatch();

    const handleCompleteTask = () => {
        setCompletedTask(!completedTask);
    };

    const deleteTaskHandle = (id: string) => {
        dispatch(deleteTask(id));
    };

    return (
        <div
            className="d-flex border mt-3 p-0"
        >
            <Col xs={3} className="p-0 m-0">
                <AnimatedButton
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
                    className={`my-3 ${completedTask ? 'completed-text' : ''}`}
                    style={{ textDecoration: completedTask ? 'line-through' : 'none' }}
                >
                    {task.description}
                </motion.h5>
                <motion.p
                    className='my-2'
                    style={{ textDecoration: completedTask ? 'line-through' : 'none' }}
                >
                    {task.date}
                </motion.p>
            </Col>

            <Col xs={3} className="p-0 m-0">
                <AnimatedButton
                    style={{ width: "100%", height: "100%", padding: "0px", borderRadius: "0%" }}
                    className="btn btn-danger"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteTaskHandle(task.id)}
                >
                    <Icon icon="akar-icons:trash-can" className="fs-1" />
                </AnimatedButton>
            </Col>
        </div>
    );
};

















