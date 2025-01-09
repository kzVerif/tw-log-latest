export async function getAll() {
    const res = await fetch('https://localhost:3000/api',{
        method: 'GET'
    })
    const data = await res.json()
    return data
}