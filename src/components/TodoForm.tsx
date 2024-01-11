import { useModal } from "../hooks/useModal";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

//props: showModal boolean, toggleModal function
interface TodoFormProps {
    showModal: boolean
    toggleModal: () => void
}

export const TodoForm = ({ showModal, toggleModal }: TodoFormProps) => {
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');

    

    const saveTask = () => {
        console.log(taskDescription)
        console.log(taskDate)
        setTaskDate('')
        setTaskDescription('')
        toggleModal()
    }

    return (
        <Modal show={showModal} onHide={toggleModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="taskDescription">
                        <Form.Label>Task description</Form.Label>
                        <Form.Control type="text" placeholder="Some description" 
                            onChange={
                                e => setTaskDescription(e.target.value)
                                }/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskDate">
                        <Form.Label>Task Date</Form.Label>
                        <Form.Control type="date" placeholder="Enter Todo"
                            onChange={ e => setTaskDate(e.target.value)
                        }/>
                    </Form.Group>
                    <Button variant="primary" onClick={saveTask}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}