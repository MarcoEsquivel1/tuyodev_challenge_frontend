import { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { TodoForm } from "./TodoForm";
import { useModal } from "../hooks/useModal";
import { AnimatePresence, motion } from "framer-motion";
import { TodoItem } from "./TodoItem";

import { useSelector } from "react-redux";
import { RootState } from "../stores/taskStore";
import { TaskInterface } from "../interfaces";
import useFilteredTasks from "../hooks/useFilteredTasks";

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
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    const filteredTasks = useFilteredTasks(tasks, searchTerm);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <Row className="justify-content-md-center">
                <motion.h1 
                    initial={{ opacity: 1, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1}}
                    transition={{ duration: 2, type: "spring", bounce: 0.5 }}
                    exit={{ opacity: 0 }}
                className="display-3 fst-italic text-center mb-5">Todo List</motion.h1>
            </Row>
            <Row>
                <Col>
                    <motion.div
                        initial={{ opacity: 1, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1}}
                        transition={{ duration: 2, type: "spring", bounce: 0.5 }}
                        exit={{ opacity: 0 }}
                    >
                        <Button variant="primary" onClick={toggleModal}>
                            Add Task
                        </Button>
                    </motion.div>
                </Col>
                <Col>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2, type: "spring", bounce: 0.5 }}
                    >
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </motion.div>
                </Col>
            </Row>
            <AnimatePresence>
                {filteredTasks.map((task: TaskInterface) => (
                    <motion.div
                        key={task.id}
                        variants={animatedItem}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <TodoItem task={task} />
                    </motion.div>
                ))}
            </AnimatePresence>

            <TodoForm showModal={showModal} toggleModal={toggleModal} />
        </>
    );
};