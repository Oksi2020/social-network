import { ADD_MESSAGE,UPDATE_MESSAGE_VALUE} from '../constants/index';

let initialState = {
    dialogs: [
        {id: 1, userName: 'Oksi', avatar:'https://static.wikia.nocookie.net/fc621525-9649-4ac8-a54c-089184c1741d'},
        {id: 2, userName: 'Serzh', avatar:'https://64.media.tumblr.com/61f51fc12ed51eac0d5fc34e4cbf8767/c20c1db5a17f4dac-ee/s500x750/aa8ef7430e18efc5cdaf551c307ab6a9c790128a.png'},
        {id: 3, userName: 'MisterX', avatar:'https://pm1.narvii.com/7640/de5f7f64281720abcb71aff74f9014e0529cdb7fr1-600-600v2_00.jpg'}
    ],  
    messages: [
        {id:1, content:'Hello', ownMessage: false},
        {id:3, content:'How are you?', ownMessage: false},
        {id:2, content:'Hiiiiiii!', ownMessage: true},
        {id:4, content:'I am fine', ownMessage: true},
        {id:5, content:'What are you doing?', ownMessage: false}
    ]
}

const dialogsPageReducer = ( state=initialState, action ) => {
    switch(action.type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, {
                    id:6,
                    content: action.message,
                    ownMessage: true
                }]
            };
        }

        default:
            return state;
    }
}

export default dialogsPageReducer;

export const addMessageAction = (message) => {
    return({type: ADD_MESSAGE, message})
}