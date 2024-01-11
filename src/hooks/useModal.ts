import { useState } from "react";

export function useModal() {
    const [showModal, setShowModal] = useState<boolean>(false);

    const toggleModal = () => setShowModal(!showModal);

    return {
        showModal,
        toggleModal,
    };
}