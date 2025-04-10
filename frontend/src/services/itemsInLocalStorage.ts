export const setItems = (number: number) => {
    const sum = localStorage.getItem("itemsInCart") || "0";

    const newSum = parseInt(sum) + number;

    localStorage.setItem("itemsInCart", newSum.toString());

    localStorage.setItem("itemsInCart", "0");

}

export const getItems = () => {
    return parseInt(localStorage.getItem("itemsInCart") || "0");
}

export const clearItems = () => {
    localStorage.removeItem("itemsInCart");
}