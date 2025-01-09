export async function getAll() {
    const res = await fetch('/api',{
        method: 'GET'
    })
    const data = await res.json()
    return data
}

export function formatDateTime(isoString: string) {
    try {
        const date = new Date(isoString);

        const day = date.getUTCDate().toString().padStart(2, '0');
        const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        const month = monthNames[date.getUTCMonth()];
        const year = (date.getUTCFullYear() + 543).toString();
        let hours = date.getUTCHours().toString().padStart(2, '0');
        let minutes = date.getUTCMinutes().toString().padStart(2, '0');

        // ปรับเวลาให้เป็น 00:00 ถ้าเป็นวันใหม่
        if (hours == "24") {
            hours = "00";
        }
        if (minutes == "60") {
            minutes = "00";
        }

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid Date"; // หรือจัดการ error ตามความเหมาะสม
    }
}