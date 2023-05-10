import { AppDispatch } from "../store"
import { groupsActions } from "../reducers/groups"
import { api } from "./api"

export function getGroups(data: { page: number }) {
	return async function (dispatch: AppDispatch) {
		try {
			dispatch(groupsActions.getGroups())

			const response = await api.get(`/group?page=${data.page}`)

            console.log(response);

			dispatch(groupsActions.getGroupsSuccess(response.data))
		} catch (e) {
            console.log(e);

			dispatch(groupsActions.getGroupsFail())
		}
	}
}
