let number = 0;
const genNumber = () => {
    number = Math.ceil(Math.random() * 100);
}
const getNumber = () => {
    return number;
}
export { genNumber, getNumber }