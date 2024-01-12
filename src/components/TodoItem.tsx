import { Card, Row, Col } from "react-bootstrap";
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
        <Card className={`mt-3 ${completedTask ? 'border-success' : 'border-danger'} border-2 shadow position-relative`}>
            <Card.Body className="p-2 ps-5">
                <Row className="align-items-center">
                    <Col md={8} className={` ${completedTask ? 'completed-text' : ''}`}>
                        <h5
                            aria-label="Task Description"
                            className="fs-3 mb-3 mt-1"
                            style={{ textDecoration: completedTask ? 'line-through' : 'none' }}
                        >
                            {task.description}
                        </h5>
                        <p
                            aria-label="Task Date"
                            className='my-1'
                            style={{ textDecoration: completedTask ? 'line-through' : 'none' }}
                        >
                            {task.date}
                        </p>
                    </Col>

                    <Col md={4} className={`text-md-end mt-2 mt-md-0`}>
                        <AnimatedButton
                            aria-label="Complete Task"
                            style={{ width: "50px", height: "50px", borderRadius: "10%" }}
                            className={`btn ${completedTask ? 'btn-success' : 'btn-danger'} mx-0 mx-md-2 p-0`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleCompleteTask}
                        >
                            <Icon icon={completedTask ? "material-symbols:check" : "lucide:x"} className="fs-3" />
                        </AnimatedButton>

                        <AnimatedButton
                            aria-label="Delete Task"
                            style={{ width: "50px", height: "50px", borderRadius: "10%" }}
                            className="btn btn-danger p-0 mx-2 "
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={deleteTaskHandle}
                        >
                            <Icon icon="akar-icons:trash-can" className="fs-3" />
                        </AnimatedButton>
                    </Col>
                    <div className={`position-absolute top-0 bottom-0 start-0 ${completedTask ? 'bg-success' : 'bg-danger'}`} style={{ width: '25px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}></div>
                </Row>
            </Card.Body>
        </Card>
    );
}