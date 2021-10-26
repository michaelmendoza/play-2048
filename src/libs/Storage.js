
/** Gets high score from local storage */
export const getHighScore = () => {
    const score = window.localStorage.getItem("score");
    if(!score) setHighScore(0);
    return score;
}

/** Saves high score to local storage */
export const setHighScore = (score) => {
    window.localStorage.setItem("score", score);
}
