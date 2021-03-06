export const is_equal = (obj1, obj2) => {
    let equal = true;
    for (let key of Object.keys(obj2)) {
        if (obj2[key] !== obj1[key]) {
            equal = false;
            break;
        }
    }
    return equal;
};

export const format = (num, divisor, decimals) => {
    return (num/divisor).toFixed(decimals);
};
