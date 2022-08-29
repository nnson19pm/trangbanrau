export const regexSpecialCharacter = (str) => {
    const regex = /[$&+,:;=?@#|'<>.^*()%!-]/g;
    if(regex.test(str)){
        return true;
    }
    return false;     
};