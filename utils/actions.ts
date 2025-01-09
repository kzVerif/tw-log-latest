export async function getAll() {
    const res = await fetch('/api',{
        method: 'GET'
    })
    const data = await res.json()
    return data
}

export function formatDateTime(isoString) {
    const date = new Date(isoString);
  
    const day = date.getUTCDate().toString().padStart(2, '0'); // วันที่
    const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    const month = monthNames[date.getUTCMonth()]; // เดือน
    const year = (date.getUTCFullYear() + 543).toString(); // ปี (พ.ศ.)
    let hours = date.getUTCHours().toString().padStart(2, '0'); // ชั่วโมง
    let minutes = date.getUTCMinutes().toString().padStart(2, '0'); // นาที
  
     // ปรับเวลาให้เป็น 00:00 ถ้าเป็นวันใหม่
      if(hours == "24"){
          hours = "00"
      }
      if(minutes == "60"){
          minutes = "00"
      }
  
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }