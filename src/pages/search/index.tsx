// import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
// import movies from "@/mock/movies.json"
import MovieItem from "@/components/movie-item"
import style from "./search.module.css"
import fetchMovies from "@/lib/fetch-movies"
import SearchableLayout from "@/components/searchable-layout"
import { useRouter } from "next/router"
import { MovieData } from "@/types"

// export const getServerSideProps = async (
// 	context: GetServerSidePropsContext
// ) => {
// 	const q = context.query.q as string
// 	const movies = await fetchMovies(q)
// 	return {
// 		props: {
// 			movies,
// 		},
// 	}
// }

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
		<div className={style.container}>
			{movies.map((movie) => (
				<MovieItem key={movie.id} {...movie} />
			))}
		</div>
	)
}

export default Page

Page.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>
}
