import React from 'react';

function MessageErrorApi(props) {
    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
            </div>
            <h5> Carregando dados do cliente</h5>
        </div>
    );
}

export default MessageErrorApi;