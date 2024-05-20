import React, { useEffect, useRef } from 'react';
import { useStore } from '../store';

const MessageBar: React.FC = () => {
    const { message, changeMessage } = useStore();

    const handleStatus = () => {
        changeMessage("", "");
    };

    if (!message.msg) {
        return null;
    }

    return (
        <div className={`message-bar message-bar--${message.type}`}>
            <span className="message-bar__text main-title">
                {message.msg}
            </span>
            <div onAnimationEnd={handleStatus} className="message-bar__progress"></div>
        </div>
    );
};

export default MessageBar;
