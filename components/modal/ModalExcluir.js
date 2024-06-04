import React, {useState} from 'react';
import MessageLoadingData from "@/components/message/messageLoadingData";

function ModalExcluir({
                          message,
                          statusVisibleModal,
                          setStatusVisibleModal,
                          id,
                          excluir,
                          loadingApi
                      }) {


    return (
        <div className={statusVisibleModal ? "modal fade show d-block" : "modal fade"} id="staticBackdrop"
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

                    {loadingApi && (
                        <MessageLoadingData message="Excluindo dados"/>
                    )}

                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-danger ps-5 pe-5" data-bs-dismiss="modal"
                                onClick={event => {
                                    event.preventDefault()
                                    excluir(id)
                                }}>CONFIRMAR
                        </button>
                        <button type="button" className="btn btn-success ps-5 pe-5" data-bs-dismiss="modal"
                                onClick={(event) => {
                                    event.preventDefault()
                                    setStatusVisibleModal(false)
                                }}>CANCELAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalExcluir;