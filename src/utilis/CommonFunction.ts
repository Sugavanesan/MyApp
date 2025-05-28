export function formatLastSeenMessage(timestamp: any) {
    const date = new Date(timestamp?._seconds * 1000);
    const now = new Date();

    // Remove time for comparison
    const dateOnly = new Date(date?.getFullYear(), date?.getMonth(), date?.getDate());
    const nowOnly = new Date(now?.getFullYear(), now?.getMonth(), now?.getDate());

    const msPerDay = 86400000;
    const diffInDays = Math?.floor((nowOnly - dateOnly) / msPerDay);

    if (diffInDays === 0) {
        // Today
        return date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
        return "Yesterday";
    } else {
        // Format as dd/mm/yyyy
        return date?.toLocaleDateString('en-GB'); // British format = dd/mm/yyyy
    }
}

export const randomString = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters?.length;
    for (let i = 0; i < length; i++) {
        result += characters?.charAt(Math?.floor(Math?.random() * charactersLength));
    }
    return result;
};

export const firstLettertoUpperCase = (str: string) => {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1) || str;
}
export const formatTimestampToTime = (timestamp: { _seconds: number, _nanoseconds: number }) => {
    if (!timestamp?._seconds) return "";

    const date = new Date(timestamp?._seconds * 1000); // Convert seconds to ms
    const hours = date?.getHours();
    const minutes = date?.getMinutes();

    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
};
