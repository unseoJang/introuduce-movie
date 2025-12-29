import { MovieData } from "@/types"

export default async function fetchMovies(q?: string): Promise<MovieData[]> {
	let url = `http://localhost:12345/movie`
	if (q) {
		url += `/search?q=${encodeURIComponent(q)}`
	}
	try {
		const res = await fetch(url)
		if (!res.ok) throw new Error("다시한번 시도해주세요")
		return await res.json()
	} catch (err) {
		console.error(err)
		return []
	}
}
