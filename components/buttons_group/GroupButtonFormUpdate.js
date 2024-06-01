import React from 'react';

function GroupButtonFormUpdate({
                                   statusButtonSalvar,
                                   statusButtonEditar,
                                   onSubmit,
                                   setStatusButtonSalvar,
                                   setStatusButtonEditar,
                                   setStatusInputDisabled,
                                   concelar
                               }) {
    return (
        <div className="d-sm-flex justify-content-end">
            <button className="btn btn-warning pe-3 ps-3 me-3"
                    onClick={(event) => {
                        event.preventDefault()
                        concelar();
                    }}
            >CANCELAR
            </button>

            {!statusButtonSalvar && (
                <button className="btn btn-success pe-4 ps-4"
                        onClick={(event) => {
                            event.preventDefault()
                            onSubmit();
                        }}>SALVAR
                </button>
            )}
            {statusButtonEditar && (
                <button className="btn btn-success pe-4 ps-4"
                        onClick={(event) => {
                            event.preventDefault();
                            setStatusButtonSalvar(false);
                            setStatusButtonEditar(false);
                            setStatusInputDisabled(false);
                        }}>EDITAR
                </button>
            )}
        </div>
    );
}

export default GroupButtonFormUpdate;