export const importAll = (r) => {
    return r.keys().map(r);
}  

export const randomNumber = (max) => {
    return Math.floor(Math.random() * max);
}

export const getRandomDefaultPhoto = () => {
    let listOfImages = importAll(require.context('../assets/img/avatars', true, /.(png|jpe?g|svg)$/));
    return listOfImages[randomNumber(listOfImages.length)].default;
}