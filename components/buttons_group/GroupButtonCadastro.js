import React from 'react';

function GroupButtonCadastro({setStatusVisibleModalCancelar, handleSubmit, onSubmit}) {
    return (
        <div className="d-sm-flex justify-content-end">
            <button className="btn btn-warning pe-3 ps-3 me-3"
                    onClick={(event) => {
                        event.preventDefault()
                        setStatusVisibleModalCancelar(true);
                    }}
            >CANCELAR
            </button>
            <button className="btn btn-success pe-4 ps-4"
                    onClick={(event) => {
                        event.preventDefault()
                        handleSubmit(onSubmit)();
                    }}>SALVAR
            </button>
        </div>
    );
}

export default GroupButtonCadastro;