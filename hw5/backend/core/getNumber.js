let number = 1;
const genNumber = () => {
    number = Math.ceil(Math.random() * 99) + 1;
}
const getNumber = () => {
    return number;
}
export { genNumber, getNumber }