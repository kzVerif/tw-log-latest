export async function getAll() {
    const res = await fetch('/api',{
        method: 'GET'
    })
    const data = await res.json()
    return data
}