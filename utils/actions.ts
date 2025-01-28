export async function getAll() {
    try {
        const res = await fetch('https://www.mdgp-backend.store/api', {
            method: 'GET',
            cache: 'no-store' // ป้องกันการ cache ข้อมูล
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // หรือ throw error ถ้าต้องการให้จัดการ error ใน component ที่เรียกใช้
    }
}

export async function getToken(inputValue: string): Promise<string | null> {
    try {
        const url = `https://2fa.live/tok/${inputValue}`;
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error("Error fetching 2FA:", error);
        return null;
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
            month: 'long', // ชื่อเดือนเต็ม
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // ใช้รูปแบบ 24 ชั่วโมง
            timeZone: 'Asia/Bangkok' // ระบุ Timezone
        };

        return new Intl.DateTimeFormat('th-TH', options).format(date);
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid Date";
    }
}