export async function getAll() {
    const res = await fetch('/api',{
        method: 'GET'
    })
    const data = await res.json()
    return data
}

export function formatDate(isoDateString: string): string {
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
      return "Invalid Date"; // or handle the error as needed
    }
  }
  
  function getThaiMonthName(monthIndex: number): string {
    const thaiMonths = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
  
    if (monthIndex >= 0 && monthIndex < 12) {
      return thaiMonths[monthIndex];
    } else {
      return "Invalid Month"; // Or handle the error as needed
    }
  }