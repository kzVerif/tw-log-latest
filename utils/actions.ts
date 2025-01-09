export async function getAll() {
    const res = await fetch('https://www.mdgp-backend.store/api',{
        method: 'GET'
    })
    const data = await res.json()
    return data
}