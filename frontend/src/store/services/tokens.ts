import { ITokens } from "../types/authentication"

class TokensService {
	setTokens(tokens: ITokens) {
		localStorage.setItem("access", tokens.access)
		localStorage.setItem("refresh", tokens.refresh)
	}

	removeTokens() {
		localStorage.removeItem("access")
		localStorage.removeItem("refresh")
	}

	getLocalRefreshToken() {
		return localStorage.getItem("refresh")
	}

	getLocalAccessToken() {
		return localStorage.getItem("access")
	}

	updateLocalAccessToken(accessToken: string) {
		localStorage.setItem("access", accessToken)
	}
}

export const tokenService = new TokensService()
