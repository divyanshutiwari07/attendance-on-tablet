export function getStartTimeStampOfYear(year) {
    return (new Date(year, 0, 1 )).setHours(0, 0, 0, 0);
}
export function getEndTimeStampOfYear(year) {
    return (new Date(year, 11, 31)).setHours(23, 59, 59, 999);
}

export function getStartTimeStampOfGivenDate(date) {
    return  new Date(date).setHours(0, 0, 0, 0);
}
export function getEndTimeStampOfGivenDate(date) {
    return  new Date(date).setHours(23, 59, 59, 999);
}

export function getCurrentTimeStampOfGivenDate(date) {
    return new Date().getTime();
}

