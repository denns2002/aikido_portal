import React, { useEffect } from "react"
import Sidebar from "../components/Sidebar"
import { useActions } from "../hooks/useActions"

interface LayoutProps {
	children: React.ReactElement
}

function Layout(props: LayoutProps) {
	const { loadUserProfile, verifyToken } = useActions()

	useEffect(() => {
		verifyToken()
		loadUserProfile()
	})

	return (
		<div className="h-full w-full flex relative">
			<Sidebar />
			<main className="h-full w-full flex overflow-auto">
				{props.children}
			</main>
		</div>
	)
}

export default Layout
