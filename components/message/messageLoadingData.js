import React from 'react';

function MessageLoadingData({message}) {
    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
            </div>
            <h5> {message}</h5>
        </div>
    );
}

export default MessageLoadingData;