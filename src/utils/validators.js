export const required = (value) => {
    if(value) {
        return undefined;
    } else {
        return 'The fild is required!';
    }
}

export const maxLength = (length) => (value) => {
    if(value.length>length) {
        return `The max length are ${length} symbols!`;
    }
    return undefined;
}