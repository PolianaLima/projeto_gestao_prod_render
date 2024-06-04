import React from 'react';

function MessageLoadingData({message}) {
    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <h5>
                <i className="h5 bi bi-info-circle"> </i>
                {message}</h5>
        </div>
    );
}

export default MessageLoadingData;