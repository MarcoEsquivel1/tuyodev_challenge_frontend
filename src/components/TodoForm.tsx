import { useState } from "react";
import { Button, Form, Modal, Toast } from "react-bootstrap";
import { useAppDispatch } from "../stores/taskStore";
import { addTask } from "../stores/slices/taskSlice";

interface TodoFormProps {
    showModal: boolean;
    toggleModal: () => void;
}

export const TodoForm = ({ showModal, toggleModal }: TodoFormProps) => {
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useAppDispatch();

    const saveTask = () => {
        if (taskDescription === "" || taskDate === "") {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
            return;
        }

        dispatch(
            addTask({
                id: Date.now() + "_task",
                description: taskDescription,
                date: taskDate,
                completed: false,
            })
        );

        setTaskDate("");
        setTaskDescription("");
        toggleModal();
    };

    return (
        <Modal show={showModal} onHide={toggleModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="taskDescription">
                        <Form.Label>Task description</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Some description"
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskDate">
                        <Form.Label>Task Date</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            placeholder="Enter Todo"
                            onChange={(e) => setTaskDate(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={saveTask}>
                        Submit
                    </Button>
                </Form>
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    style={{
                        position: "fixed",
                        bottom: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        padding: "8px",
                        borderRadius: "4px",
                    }}
                    autohide
                    delay={5000}
                >
                    Please fill all the fields
                </Toast>
            </Modal.Body>
        </Modal>
    );
};




