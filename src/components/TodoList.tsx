import { Button, Col, Row } from "react-bootstrap"
import { TodoForm } from "./TodoForm"
import { useModal } from "../hooks/useModal"
import { RootState } from "../stores/taskStore"
import { useSelector } from "react-redux"
import { TodoItem } from "./TodoItem"
import { AnimatePresence, motion } from "framer-motion"

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
        scaleY: 0, opacity: 0, zIndex: -1,
    },
};

export const TodoList = () => {
    const { showModal, toggleModal } = useModal();

    const tasks = useSelector((state: RootState) => state.tasks.tasks);

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
                <Col></Col>
            </Row>
            <AnimatePresence>
                {tasks.map((task) => (
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