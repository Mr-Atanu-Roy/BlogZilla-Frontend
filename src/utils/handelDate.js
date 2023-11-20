//func to extract date from date string

export default function handelDate(date) {
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Months are zero-indexed
    const day = dateObject.getDate();
    const hour = dateObject.getHours();
    const minute = dateObject.getMinutes();
    const second = dateObject.getSeconds();
    const millisecond = dateObject.getMilliseconds();

    return {
        year,
        month,
        day,
        hour,
        minute,
        second,
        millisecond
    }
}
