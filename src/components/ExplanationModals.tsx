import "./explanationModals.css"
import * as React from "react"
import Modal from "react-bootstrap/Modal";

export const RentabiliteBruteExplanationModal = () => {

    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <>
            <span className={'explanation-modal-button'} onClick={() => setIsOpen(true)}>
                🤔
            </span>

            <Modal show={isOpen} onHide={() => setIsOpen(false)}>
                <Modal.Body>
                    <h2>Rentabilité brute</h2>
                    <p>
                        Some explanation about what's the rentabilité brute
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export const RentabiliteNetNetExplanationModal = () => {

    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <>
            <span className={'explanation-modal-button'} onClick={() => setIsOpen(true)}>
                🤔
            </span>

            <Modal show={isOpen} onHide={() => setIsOpen(false)}>
                <Modal.Body>
                    <h2>Rentabilité brute</h2>
                    <p>
                        Some explanation about what's the rentabilité brute
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}
