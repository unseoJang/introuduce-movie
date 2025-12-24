import { useRouter } from "next/router"

const page = () => {
	const router = useRouter()
	const { id } = router.query
	return <h1>{id} 영화 상세 페이지</h1>
}

export default page
