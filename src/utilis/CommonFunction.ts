import { getDownloadURL, ref, uploadBytes } from "@react-native-firebase/storage";
import storage from '@react-native-firebase/storage';

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


export const getDateLabel = (current, previous) => {
    if (!current) return null;

    const currentDate = current?.toDate?.() || new Date(current);
    const previousDate = previous?.toDate?.() || new Date(previous);

    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const prevDay = previousDate.getDate();
    const prevMonth = previousDate.getMonth();
    const prevYear = previousDate.getFullYear();

    const isSameDay =
        currentDay === prevDay &&
        currentMonth === prevMonth &&
        currentYear === prevYear;

    if (!isSameDay) {
        const now = new Date();
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);

        const isToday =
            currentDay === now.getDate() &&
            currentMonth === now.getMonth() &&
            currentYear === now.getFullYear();

        const isYesterday =
            currentDay === yesterday.getDate() &&
            currentMonth === yesterday.getMonth() &&
            currentYear === yesterday.getFullYear();

        if (isToday) return 'Today';
        if (isYesterday) return 'Yesterday';

        const dd = String(currentDay).padStart(2, '0');
        const mm = String(currentMonth + 1).padStart(2, '0');
        const yyyy = currentYear;
        return `${dd}/${mm}/${yyyy}`;
    }

    return null;
};

export const uploadImage = async (uri: string, userId: string) => {
    try {
        const filePath = uri.startsWith('file://') ? uri : `file://${uri}`;
        const storagePath = `users/${userId}/profilePhoto.jpg`;
        const ref = storage().ref(storagePath);

        console.log('Uploading from:', filePath,ref);
        await ref.putFile(filePath);
        console.log('Upload complete');

        const downloadURL = await ref.getDownloadURL();
        console.log('Uploaded image URL:', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Upload failed:', error);
        return null;
    }
};


