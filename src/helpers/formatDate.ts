export function formatDate(dateTimeString: string) {
    const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const date = new Date(dateTimeString);
    //@ts-ignore
    return date.toLocaleDateString('en-GB', options).replace(",", " at");
}