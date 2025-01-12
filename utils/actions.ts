"use server"

export async function getAll() {
    const res = await fetch('https://www.mdgp-backend.store/api', {
        method: 'GET'
    })
    const data = await res.json()
    return data
}

export async function getToken(inputValue: string): Promise<string | null> { // ระบุ return type เป็น Promise<string | null>
    try {
        const url = `https://2fa.live/tok/${inputValue}`
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.token;
    } catch (error: any) {
        console.error("Error fetching 2FA:", error);
        return null; // Return null ในกรณี error
    }
}

export async function formatDate(isoDateString: string): Promise<string> {
    try {
        const date = new Date(isoDateString);

        if (isNaN(date.getTime())) {
            throw new Error("Invalid date string");
        }

        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Bangkok',
        } as Intl.DateTimeFormatOptions & { minimumIntegerDigits: number }; // Type Assertion

        return new Intl.DateTimeFormat('th-TH', options).format(date);
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid Date";
    }
}