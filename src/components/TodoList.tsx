import { Button, Col, Row } from "react-bootstrap"
import { TodoForm } from "./TodoForm"
import { useModal } from "../hooks/useModal"
import { RootState } from "../stores/taskStore"
import { useSelector } from "react-redux"
import { TodoItem } from "./TodoItem"

export const TodoList = () => {
    const { showModal, toggleModal } = useModal()

    const tasks = useSelector((state: RootState) => state.tasks.tasks)

    return (
        <>
            <Row className="justify-content-md-center">
                <h1 className="display-3 fst-italic text-center">Todo List</h1>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={toggleModal}>Add Task</Button>
                </Col>
                <Col>
                </Col>
            </Row>
                
            {tasks.map(task => (
            <Row>
                <TodoItem key={task.id} task={task}/>
            </Row>
            ))}
                
            <TodoForm showModal={showModal} toggleModal={toggleModal}/>
        </>
    )
}