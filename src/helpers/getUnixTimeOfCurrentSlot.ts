export function getCurrentAndYesterdayUnixTime(): [number, number] {
    const currentDate = new Date();
    const currentUnixTime = Math.floor(currentDate.getTime() / 1000);

    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1);
    const yesterdayUnixTime = Math.floor(yesterdayDate.getTime() / 1000);

    return [currentUnixTime*1000, yesterdayUnixTime*1000];
}
