"use server"

export async function getAll() {
    const res = await fetch('/api', {
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

export async function formatDate(isoDateString: string): Promise<string> { // ระบุ return type เป็น Promise<string>
    try {
        const date = new Date(isoDateString);

        if (isNaN(date.getTime())) {
            throw new Error("Invalid date string");
        }

        const day = date.getDate().toString().padStart(2, '0');
        const month = getThaiMonthName(date.getMonth());
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid Date";
    }
}

async function getThaiMonthName(monthIndex: number): Promise<string> { // ระบุ return type เป็น Promise<string>
    const thaiMonths = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    if (monthIndex >= 0 && monthIndex < 12) {
        return thaiMonths[monthIndex];
    } else {
        return "Invalid Month";
    }
}