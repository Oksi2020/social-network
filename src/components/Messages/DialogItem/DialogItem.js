import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './DialogItem.module.scss'

const DialogItem = (props) => {
    return (
        <div className={classes.dialogs_item}>
            <img className={classes.dialog__avatar} src={props.avatar} alt=''/>
            <NavLink to={'/messages/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;