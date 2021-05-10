import React from 'react';

function ErrorNotice (props) {
    return (
        <div className="error-notice" align="center">
            <span>{props.message}</span>
            <button onClick={props.clearError}>X</button>
        </div>
    );
}

export default ErrorNotice;