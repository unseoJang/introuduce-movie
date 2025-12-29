export default async function fetchOneMovie(id: number) {
	const url = `http://localhost:12345/movie/${id}`
	try {
		const res = await fetch(url)
		if (!res.ok) throw new Error("다시한번 시도해주세요")
		return await res.json()
	} catch (err) {
		console.error(err)
		return null
	}
}
