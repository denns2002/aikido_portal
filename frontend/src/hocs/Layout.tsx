import React, { useEffect } from "react"
import Sidebar from "../components/base/Sidebar"
import { useActions } from "../hooks/useActions"
import { useGetMyProfileQuery, usePostVerifyTokenMutation } from "../store/apis"
import Footer from "../components/base/Footer"
import Navbar from "../components/base/Navbar"

interface LayoutProps {
	children: React.ReactElement
}

function Layout(props: LayoutProps) {
	const {verifyToken, loadUserProfile} = useActions()

	useEffect(() => {
		verifyToken()
		loadUserProfile()
	}, [])

	return (
		<div className="h-full w-full overflow-x-hidden scrollbar">
			<Navbar />
			<div className="w-full">
				<main className="min-h-[calc(100vh-10rem)] flex justify-center py-[2rem]">
					{props.children}
				</main>
				<Footer />
			</div>
		</div>
	)
}

export default Layout
