
/** Checks if two array are equal */
export const arrayEquals = (a, b) => {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;

    const length = a.length;
    for (let i = 0; i < length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}