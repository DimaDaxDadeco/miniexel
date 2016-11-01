const generateLetters = (number) => {
    const base = "A".charCodeAt(0) - 1;
    const charAmount = 26;
    const orderLetters = [];
    while (number > charAmount) {
        orderLetters.unshift(String.fromCharCode(base + number % charAmount));
        number = Math.floor(number / charAmount);
    }
    orderLetters.unshift(String.fromCharCode(base + Math.floor(number)));
    return orderLetters.join("");
};

export default function () {
    return generateLetters;
}