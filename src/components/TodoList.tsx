import { Button, Col, Row } from "react-bootstrap"
import { TodoForm } from "./TodoForm"
import { useModal } from "../hooks/useModal"

export const TodoList = () => {
    const { showModal, toggleModal } = useModal()

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
            <TodoForm showModal={showModal} toggleModal={toggleModal}/>
        </>
    )
}