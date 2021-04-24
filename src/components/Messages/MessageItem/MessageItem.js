import React from 'react';

import classes from './MessageItem.scss';

const MessageItem = (props) => {
    return(
        <div className={`message_item${props.ownMessage?' active':''}`}>
            {props.content}
        </div>
    )
}

export default MessageItem;