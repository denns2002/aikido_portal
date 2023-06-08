import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { Mutex } from "async-mutex";
import { tokenService } from "../services/tokens";
import { ITokens } from '../types/tokens';
import axios from "axios";

const mutex = new Mutex()

const baseUrl = "http://212.113.117.193:8000/api"

const baseQuery = fetchBaseQuery({ baseUrl: baseUrl, prepareHeaders: (headers) => {
		const access = tokenService.getLocalAccessToken()
		
		if (access) {
			headers.set("Authorization", `JWT ${access}`)
		}

		return headers
	} })

export const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()

    let result = await baseQuery(args, api, extraOptions)

    const refreshToken = tokenService.getLocalRefreshToken()

    console.log(result, refreshToken);

    if (result.error && result.error.status === 401 && refreshToken) {
        console.log("Прошел if");
        
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
                console.log("Прошел mutex");
                
            try {

                const response = await axios.post<ITokens>(`${baseUrl}/auth/refresh/`, {refresh: refreshToken})

                console.log(response);

                if (response.data) {
                    tokenService.updateLocalAccessToken(response.data.access)

                    result = await baseQuery(args, api, extraOptions)
                } else {

                }
            } catch (e) {
                console.log("Пиздец catch", e);
                
            } finally {
                release()
            }
        }
        else {
            console.log("Пиздец else");

            await mutex.waitForUnlock();

            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result
}