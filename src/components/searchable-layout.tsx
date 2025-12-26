import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import type { ChangeEvent, KeyboardEvent } from "react"
import style from "./searchable-layout.module.css"
export default function searchableLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const router = useRouter()
	const [search, setSearch] = useState("")
	const q = router.query.q as string

	useEffect(() => {
		setSearch(q || "")
	}, [q])

	const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}
	const onSubmit = () => {
		if (!search) return
		router.push(`/search?q=${search}`)
	}

	const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") onSubmit()
	}

	return (
		<div>
			<div className={style.searchbar_container}>
				<input
					id="search-input"
					type="text"
					value={search}
					onChange={onChangeSearch}
					placeholder="검색어를 입력하세요..."
					onKeyDown={onKeyDown}
				/>
				<button onClick={onSubmit}>검색</button>
			</div>
			<div></div>
			{children}
		</div>
	)
}
