import "./explanationModals.css"
import * as React from "react"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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

export const NewVsOldHouseExplanationModal = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <>
            <span className={'explanation-modal-button'} onClick={() => setIsOpen(true)}>
                🤔
            </span>
            <Modal show={isOpen} onHide={() => setIsOpen(false)}>
                <Modal.Body>
                    <h2>Bien neuf ou bien ancien ?</h2>
                    <p>
                        L' ancienneté du bien que vous vous apprêtez à acheter a de l'importance pour 2
                        raisons principales.
                    </p>
                    <ul>
                        <li>
                            <p><b>Frais de Notaire</b>: Les frais de notaires s'élèvent à <code>4%</code> de la valeur du bien
                        pour un bien neuf, contre <code>8%</code> pour un bien ancien. <a href='h'>source</a></p>
                        </li>
                        <br />
                        <li><b>Avantage fiscaux</b>: certains types de déclarations fiscales comme la loi Pinel ne sont
                        accessible que pour des bien neufs.</li>
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    )
}


export const InterestRateExplanationModal = () => {

    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <>
            <span className={'explanation-modal-button'} onClick={() => setIsOpen(true)}>
                🤔
            </span>

            <Modal show={isOpen} onHide={() => setIsOpen(false)}>
                <Modal.Body>
                    <p>
                        On entend ici le taux d'intérêt global, qui comprend les assurances, frais de dossier etc.
                    </p>
                </Modal.Body>
            </Modal>
        </>
    )
}





export const PartFiscalExplanationModal = () => {

    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <>
            <span className={'explanation-modal-button'} onClick={() => setIsOpen(true)}>
                🤔
            </span>

            <Modal show={isOpen} onHide={() => setIsOpen(false)}>
                <Modal.Body>
                    <p>
                        Le nombre de parts fiscales est calculé à partir de la composition familiale de votre foyer fiscal.
                    </p>
                    <p>&rarr; Un adulte compte pour un point. Un couple sans enfant aura donc 2 parts fiscales</p>
                    <p>&rarr; Les 2 premiers enfants comptent pour une demi part fiscale. Les suivants pour une part complète. Un couple avec 2 enfants compte donc pour 3 parts fiscales. Un couple avec 3 enfants, 4 parts fiscales.</p>
                    <Button className={'btn'} href=''>Source</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}
