import React, { useEffect } from "react"
import Sidebar from "../components/base/Sidebar"
import { useActions } from "../hooks/useActions"
import { useGetMyProfileQuery, usePostVerifyTokenMutation } from "../store/apis"

interface LayoutProps {
	children: React.ReactElement
}

function Layout(props: LayoutProps) {

	return (
		<div className="h-full w-full flex relative">
			<Sidebar />
			<main className="h-full w-full flex overflow-auto justify-center">
				{props.children}
			</main>
		</div>
	)
}

export default Layout
