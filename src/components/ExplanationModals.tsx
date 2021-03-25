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
                    <h2><span>🤔 </span>Rentabilité brute</h2>
                    <p>
                        Le rendement brut est le plus simple à calculer. Il ne prend pas en compte des paramètres
                        pourtant essentiels comme les charges payées par le locataires ou la fiscalité.
                    </p>
                    <p>Il se calcule en divisant le loyer annuel par le prix du bien, multiplié
                        par 100 pour obtenir un pourcentage.</p>
                    <p>Ici on obtient donc... formule.</p>
                    <p><b>Attention</b></p>
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
