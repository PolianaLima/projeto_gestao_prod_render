import React from 'react';

function MessageErroApi({erroApiMessage}) {
    return (
        <p className="p-2 text-danger fw-bolder">
            <i className="bi bi-exclamation-triangle"> </i>
            {erroApiMessage}
        </p>
    );
}

export default MessageErroApi;
