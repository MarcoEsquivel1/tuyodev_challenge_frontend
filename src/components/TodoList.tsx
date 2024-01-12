import { useState, useEffect } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { TodoForm } from "./TodoForm";
import { useModal } from "../hooks/useModal";
import { RootState } from "../stores/taskStore";
import { useSelector } from "react-redux";
import { TodoItem } from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import { TaskInterface } from "../interfaces";

const animatedItem = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: {
            staggerChildren: 0.2,
        },
    },
    exit: {
        scaleY: 0,
        opacity: 0,
        zIndex: -1,
    },
};

export const TodoList = () => {
    const { showModal, toggleModal } = useModal();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    useEffect(() => {
        const timerId = setTimeout(() => {
            const filtered = tasks.filter(
                (task) =>
                    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    task.date.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredTasks(filtered);
        }, 700);

        return () => clearTimeout(timerId);
    }, [searchTerm, tasks]);

    return (
        <>
            <Row className="justify-content-md-center">
                <h1 className="display-3 fst-italic text-center">Todo List</h1>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={toggleModal}>
                        Add Task
                    </Button>
                </Col>
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>
            <AnimatePresence>
                {filteredTasks.map((task) => (
                    <motion.div
                        key={task.id}
                        variants={animatedItem}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <Row>
                            <motion.div variants={animatedItem}>
                                <TodoItem task={task} />
                            </motion.div>
                        </Row>
                    </motion.div>
                ))}
            </AnimatePresence>

            <TodoForm showModal={showModal} toggleModal={toggleModal} />
        </>
    );
};



