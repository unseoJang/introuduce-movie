import { MovieData } from "@/types"
import Link from "next/link"
import style from "./movie-item.module.css"

export default function MovieItem({ id, title, posterImgUrl }: MovieData) {
	return (
		<Link href={`/movies/${id}`} className={style.container}>
			<img src={posterImgUrl} alt={`${title}포스터`} />
		</Link>
	)
}
