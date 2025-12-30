export default async function fetchOneMovie(id: number) {
	const url = `https://onebite-cinema-api-main-eight.vercel.app/movie/${id}`
	try {
		const res = await fetch(url)
		if (!res.ok) throw new Error("다시한번 시도해주세요")
		return await res.json()
	} catch (err) {
		console.error(err)
		return null
	}
}
