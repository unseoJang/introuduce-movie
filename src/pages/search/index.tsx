import { ReactNode, useEffect, useState } from "react"
import MovieItem from "@/components/movie-item"
import style from "./search.module.css"
import fetchMovies from "@/lib/fetch-movies"
import SearchableLayout from "@/components/searchable-layout"
import { useRouter } from "next/router"
import { MovieData } from "@/types"
import Head from "next/head"

const Page = ({}) => {
	const [movies, setMovies] = useState<MovieData[]>([])
	const router = useRouter()
	const q = router.query.q as string

	useEffect(() => {
		const fetchSearchResult = async () => {
			const movies = await fetchMovies(q)
			setMovies(movies)
		}
		fetchSearchResult()
	}, [q])

	return (
		<>
			<Head>
				<title>한입 씨네마</title>
				<meta property="og:image" content="/thumbnail.png" />
				<meta property="og:title" content="한입 씨네마" />
				<meta
					property="og:description"
					content="한입 씨네마에 등록된 영화들을 만나보세요"
				/>
			</Head>
			<div className={style.container}>
				{movies.map((movie) => (
					<MovieItem key={movie.id} {...movie} />
				))}
			</div>
		</>
	)
}

export default Page

Page.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>
}
