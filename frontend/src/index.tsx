import React from "react"
import "./styles/index.css"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from './store/store';
import { setupInterceptors } from "./store/action-creators/api"
import NotificationProvider from "./components/notifications/PushNotificationsProvider"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<NotificationProvider><App /></NotificationProvider>
		</Provider>
	</BrowserRouter>
)

setupInterceptors(store.dispatch)

declare global {
    interface Window { store: any }
}

window.store = store
