import React from 'react';

function ModalCancelar({statusVisibleModalCancelar, setStatusVisibleModalCancelar, toggleModal, message}) {
    const closeModal = () => {
        setStatusVisibleModalCancelar(false);
    }

    return (
        <div className={statusVisibleModalCancelar ? "modal fade show d-block" : "modal fade"} id="staticBackdrop"
             data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 w-100 text-center" id="staticBackdropLabel">
                            <i className="h1 bi bi-exclamation-triangle-fill text-danger"></i>
                        </h1>
                    </div>
                    <div className="modal-body">
                        <p className="text-center">{message}</p>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-danger ps-5 pe-5" data-bs-dismiss="modal"
                                onClick={toggleModal}>SIM
                        </button>
                        <button type="button" className="btn btn-success ps-5 pe-5" data-bs-dismiss="modal"
                                onClick={closeModal}>NAO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCancelar;