import React from "react"
import Sidebar from "../components/Sidebar"

interface LayoutProps {
	children: React.ReactElement
}

function Layout(props: LayoutProps) {
	return (
		<div className="h-full w-full flex relative">
			<Sidebar />
			<main className="h-full w-full flex">
				{props.children}
			</main>
		</div>
	)
}

export default Layout
