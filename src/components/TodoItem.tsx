import { Col, ListGroupItem, Row, ToggleButton } from "react-bootstrap";
import { TaskInterface } from "../interfaces";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const TodoItem = ({ task }: { task: TaskInterface }) => {
    const [completedTask, setCompletedTask] = useState(task.completed);

    const handleCompleteTask = () => {
        setCompletedTask(!completedTask);
    };

    return (
        <div>
            <motion.div
                className={`d-flex justify-content-between align-items-center mt-2 ${completedTask ? 'completed' : ''}`}
                initial={{ border: '1px solid red' }}
                animate={{ border: completedTask ? '1px solid #28a745' : '1px solid red' }}
            >
                <ListGroupItem className="w-100 border-0 position-relative">
                    <Row className="w-100 align-items-center">
                        <Col xs={12} sm={8} md={6} lg={6}>
                            <motion.h5
                                className='my-3' style={{ textDecoration: completedTask ? 'line-through' : 'none' }}
                            >
                                {task.description}
                            </motion.h5>
                        </Col>

                        <Col xs={12} sm={8} md={6} lg={4} className={`ml-auto ${completedTask ? 'completed-text' : ''}`}>
                            <motion.p className='my-2'
                                style={{ textDecoration: completedTask ? 'line-through' : 'none' }}
                            >
                                {task.date}
                            </motion.p>
                        </Col>

                        <Col xs={'auto'} lg={'auto'} className="pr-0">
                            <ToggleButton
                                className="d-flex align-items-center justify-content-center"
                                style={{ width: "35px", height: "35px", padding: "0px" }}
                                id="toggle-check"
                                type="checkbox"
                                variant={completedTask ? "outline-success" : "outline-danger"}
                                checked={completedTask}
                                value={task.id}
                                onChange={handleCompleteTask}
                            >
                                <AnimatePresence>
                                    {completedTask && (
                                        <motion.div
                                            key="completed-icon"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0 }}
                                        >
                                            <Icon icon="material-symbols:check" className="fs-2 text-white" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </ToggleButton>
                        </Col>

                        <Col xs={'auto'} lg={'auto'} className="pl-0">
                            <motion.button
                                style={{ width: "35px", height: "35px", padding: "0px" }}
                                className="btn btn-danger"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Icon icon="akar-icons:trash-can" className="fs-4" />
                            </motion.button>
                        </Col>
                    </Row>
                </ListGroupItem>
            </motion.div>
        </div>
    );
};














