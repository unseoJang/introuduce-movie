import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import style from "./[id].module.css"
import fetchOneMovie from "@/lib/fetch-one-movie"
import { useRouter } from "next/router"
import Head from "next/head"

export const getStaticPaths = async () => {
	return {
		paths: [
			{ params: { id: "1" } },
			{ params: { id: "2" } },
			{ params: { id: "3" } },
		],
		fallback: true, // false or 'blocking'
	}
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
	const { id } = context.params!
	const movie = await fetchOneMovie(Number(id))
	if (!movie) {
		return {
			notFound: true,
		}
	}
	return {
		props: {
			movie,
		},
	}
}

const Page = ({ movie }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const router = useRouter()
	if (router.isFallback) return "로딩중입니다"
	if (!movie) return "영화를 찾을수 없습니다 다시 시도하세요"

	const {
		// id,
		title,
		releaseDate,
		company,
		genres,
		subTitle,
		description,
		runtime,
		posterImgUrl,
	} = movie
	return (
		<>
			<Head>
				<title>한입 씨네마 - {title}</title>
				<meta property="og:image" content={posterImgUrl} />
				<meta property="og:title" content={`한입 씨네마 - ${title}`} />
				<meta property="og:description" content={description} />
			</Head>
			<div className={style.container}>
				<div
					className={style.poster_img_container}
					style={{ backgroundImage: `url('${posterImgUrl}')` }}
				>
					<img src={posterImgUrl} alt={title} />
				</div>
				<div className={style.title}>{title}</div>
				<div className={style.info}>
					{releaseDate} / {genres.join(", ")} / {runtime}분
				</div>
				<div className={style.company}>{company}</div>
				<div className={style.subTitle}>{subTitle}</div>
				<div className={style.description}>{description}</div>
			</div>
		</>
	)
}

export default Page
