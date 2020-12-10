export const secToMs = (second) => {
    return second * 1000;
};

export const msToSec = (ms) => {
    return ms / 1000;
};

export const msToMinAndSec = (ms) => {
    const oneSecond = secToMs(1);
    const oneMinute = 60 * oneSecond;
    const oneHour = 60 * oneMinute;

    const minutes = Math.floor((ms % oneHour) / oneMinute);
    const seconds = Math.floor((ms % oneMinute) / oneSecond);

    return [minutes, seconds];
};

export const randomIntFromOneUntil = (max) => {
    return Math.floor(Math.random() * (max - 1)) + 1;
};
