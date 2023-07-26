import axios from "axios"
import { tokenService } from "../services/tokens"
import { AppDispatch } from "../store"

export const api = axios.create({
	baseURL: "http://localhost:8000/api",
	headers: {
		"Content-Type": "application/json",
	},
})

export function setupInterceptors(dispatch: AppDispatch) {
	api.interceptors.request.use(
		(config) => {
			const accessToken = tokenService.getLocalAccessToken()

			if (accessToken) {
				config.headers["Authorization"] = `JWT ${accessToken}`
			}

			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)

	api.interceptors.response.use(
		(response) => {
			return response
		},
		async (error) => {
			const originalConfig = error.config

			const refreshToken = tokenService.getLocalRefreshToken()

			if (error.response) {
				if (
					error.response.status === 401 &&
					!originalConfig._retry &&
					refreshToken
				) {
					originalConfig._retry = true

					try {
						const response = await api.post("/users/refresh/", {
							refresh: refreshToken,
						})

						const accessToken = response.data.access

						// dispatch();

						tokenService.updateLocalAccessToken(accessToken)

						return api({
							...originalConfig,
							headers: {
								...originalConfig.headers,
								Authorization: `JWT ${accessToken}`,
							},
							sent: true,
						})
					} catch (e) {
						return Promise.reject(e)
					}
				}
			}

			return Promise.reject(error)
		}
	)
}
