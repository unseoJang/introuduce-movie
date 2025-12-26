import { useRouter } from "next/router"
import { ReactNode } from "react"
import movies from "@/mock/movies.json"
import MovieItem from "@/components/movie-item"
import style from "./search.module.css"
const page = () => {
	const router = useRouter()
	const { q } = router.query
	return (
		<div className={style.container}>
			{movies.map((movie) => (
				<MovieItem key={movie.id} {...movie} />
			))}
		</div>
	)
}

export default page

page.getLayout = (page: ReactNode) => {
	const SearchableLayout = require("@/components/searchable-layout").default
	return <SearchableLayout>{page}</SearchableLayout>
}
