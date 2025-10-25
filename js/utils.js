// js/utils.js
export function bitsParaMega(bits) {
    return Math.floor(bits / 999);
}

export function bitsParaTera(bits) {
    return Math.floor(bits / (1000 * 999));
}

export function showAlert(message) {
    alert(message);
}
