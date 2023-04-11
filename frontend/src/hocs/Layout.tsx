import Navbar from "../components/Navbar"

interface LayoutProps {
	children: React.ReactElement
}

function Layout(props: LayoutProps) {
	return (
		<>
			<main className="flex h-screen w-screen">
			<Navbar />
			{props.children}
			</main>
		</>
	)
}

export default Layout
