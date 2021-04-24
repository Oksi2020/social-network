import profilePageReducer, { addPostAction, setProfile, setStatus } from './profile-reducer';
import { ADD_POST, SET_PROFILE, GET_STATUS, SET_STATUS } from '../constants/index';

let state = {
    posts: [
        {id:1, title: 'My first post', description: 'Hello. This is my first post! Welcome to my page!', image: 'https://www.abc.net.au/cm/rimage/12465498-16x9-xlarge.jpg?v=2', likeCount: 12},
        {id:2, title: 'My second post', description: 'Hello. This is my second post! Welcome to my page!', image: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F765877054%2F960x0.jpg%3Ffit%3Dscale', likeCount: 3},
        {id:3, title: 'How to cook the cakes', description: 'Hello. Today i`ll tell you about cooking cakes!', image: 'https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg', likeCount: 21}
    ],
    profile: null,
    status: ''
}

it('Adding new post test', () => {
    let action = addPostAction('Help animals it is a sense of life');
    let newState = profilePageReducer(state, action);
    expect(newState.posts.length).toBe(4);
})

it('Set user profile test', () => {
    let testProtile = {id: 1, userName: 'Oksana', userSurname: 'Rozbytska', status: 'My mission is always help animals'}
    let action = setProfile(testProtile);
    let newState = profilePageReducer(state, action);
    expect(newState.profile).toBe(testProtile);
    expect(newState.profile.id).toBe(1);
    expect(newState.profile.userName).toBe('Oksana');
})

it('Set user status test', () => {
    let action = setStatus('Help animals it is a sense of life');
    let newState = profilePageReducer(state, action);
    expect(newState.status).toBe('Help animals it is a sense of life');
})