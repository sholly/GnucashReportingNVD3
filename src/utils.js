/**
 * Created by sholly on 7/2/17.
 */
export function getToday() {
    let today = new Date();
    let fullYear = today.getFullYear();
    let month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth()}`;
    let dayOfMonth = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`;
    let todayString = `${fullYear}-${month}-${dayOfMonth}`;
    return todayString;
}
export function getFirstDateOfThisMonth() {
    let today = new Date();
    let fullYear = today.getFullYear();
    let month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth()}`;
    let todayString = `${fullYear}-${month}-01`;
    return todayString;
}

export function getFirstDateOfThisYear() {
    let today = new Date();
    let fullYear = today.getFullYear();
}
