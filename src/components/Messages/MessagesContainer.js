import { connect } from 'react-redux';
import Messages from './Messages';
import { compose } from 'redux';
import { addMessageAction } from '../../redux/dialogs-reducer';
import withAuthRedirect from '../../hoc/withRedirect';

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPageReducer.dialogs,
        messages: state.dialogsPageReducer.messages,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendNewMessage: (value) => {
            dispatch(addMessageAction(value));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Messages);