import SearchableLayout from "@/components/searchable-layout"
import { ReactNode } from "react"
// import movies from "@/mock/movies.json"
import MovieItem from "../components/movie-item"
import style from "./index.module.css"
import fetchRandomMovies from "@/lib/fetch-random-movies"
import fetchMovies from "@/lib/fetch-movies"
import { InferGetServerSidePropsType } from "next"

export const getServerSideProps = async () => {
	const [allMovies, recoMovies] = await Promise.all([
		fetchMovies(),
		fetchRandomMovies(),
	])
	return {
		props: {
			allMovies,
			recoMovies,
		},
	}
}

export default function Home({
	allMovies,
	recoMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<div className={style.container}>
			<section>
				<h3>지금 가장 추천하는 영화</h3>
				<div className={style.recommended_movies}>
					{recoMovies.slice(0, 3).map((movie) => (
						<MovieItem key={movie.id} {...movie} />
					))}
				</div>
			</section>
			<section>
				<h3>등록된 모든 영화</h3>
				<div className={style.all_movies}>
					{allMovies.slice(0, 5).map((movie) => (
						<MovieItem key={movie.id} {...movie} />
					))}
				</div>
			</section>
		</div>
	)
}

Home.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>
}
