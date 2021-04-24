import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLength, required } from '../../utils/validators';
import { Textarea } from '../common/FormControl';

import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';

import classes from './Messages.module.scss';

const validateMexLength = maxLength(10);

const NewMessageText = (props) => {
    return ( 
    <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} name='newMessageValue' placeholder='Write new message' validate={[ required, validateMexLength]}/>
        <div>
            <button>Send message</button>
        </div>
    </form>)
}

const NewMessageTextForm = reduxForm({form: 'newMessageForm'})(NewMessageText);
const Messages = ( props ) => {
    const sendMessage= (value) => {
        props.sendNewMessage(value.newMessageValue);
    }   

    return (
        <div className={ classes.messages }>
            <div className={ classes.dialogs }>
                {props.dialogs.map( dialog =>(
                        <DialogItem 
                            key={dialog.id}
                            id={dialog.id}
                            name={dialog.userName}
                            avatar={dialog.avatar}
                        />
                    ))
                }
            </div>
            <div className={ classes.dialog }>
                {
                    props.messages.map( message => (
                        <MessageItem 
                            key={message.id} 
                            content={message.content} 
                            ownMessage={message.ownMessage}
                        />
                    ))
                }
                <NewMessageTextForm onSubmit={sendMessage}/>
            </div>
        </div>
    );
}

export default Messages;