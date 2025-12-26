import { useRouter } from "next/router"
import { ReactNode } from "react"
const page = () => {
	const router = useRouter()
	const { q } = router.query
	return <h1>검색결과 : {q}</h1>
}

export default page

page.getLayout = (page: ReactNode) => {
	const SearchableLayout = require("@/components/searchable-layout").default
	return <SearchableLayout>{page}</SearchableLayout>
}
