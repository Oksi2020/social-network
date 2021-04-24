import React, { useEffect, useState } from 'react';

// class ProfileStatus extends Component {

//     state = {
//         editMode: false,
//         status: this.props.status
//     }

//     toggleEditMode = () => {
//         this.setState({
//             editMode: !this.state.editMode
//         })
//     }
//     setNewStatus = () => {
//         this.setState({
//             editMode: false
//         })
//         this.props.setUserStatus(this.state.status);
//     }
//     changeStatus = (e) => {
//         this.setState({
//             status: e.currentTarget.value
//         });
//     }
//     componentDidUpdate(prevProps, prevState) {
//         if(prevProps.status!==this.props.status) {
//             this.setState({
//                 status: this.props.status
//             })
//         }
//     }
//     render() {
//         return <div>
//             {
//                 this.state.editMode
//                 ? <input autoFocus={true} onBlur={()=>{this.setNewStatus()}} onChange={this.changeStatus} value={this.state.status} />
//                 : <span onDoubleClick={()=>{this.toggleEditMode()}}>{this.props.status||'-----'}</span>
//             }
//         </div>
//     }
// }

const ProfileStatus = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status] );
    
    const toggleEditMode = () => {
        setEditMode(true);
    }
    const setNewStatus = () => {
        setEditMode(false);
        props.setUserStatus(status);
    }
    const changeStatus = (e) => {
            setStatus(e.currentTarget.value);
    }

    return <div>
        {
            editMode
                ? <input autoFocus={true} onBlur={() => { setNewStatus() }} onChange={changeStatus} value={status} />
                : <span onDoubleClick={() => { toggleEditMode() }}>{props.status || '-----'}</span>
        }
    </div>
}
export default ProfileStatus;