import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { GroupsState, IGroup } from '../types/groups';

const initialState: GroupsState = {
	groups: [],
    isLoading: false
}

const groupsSlice = createSlice({
	name: "groups",
	initialState: initialState,
	reducers: {
        getGroups(state) {
            state.isLoading = true
        },
        getGroupsSuccess(state, action: PayloadAction<IGroup[]>) {
            state.isLoading = false
            state.groups = action.payload
        },
        getGroupsFail(state) {
            state.isLoading = false
        },
    }
})

export const groupsReducer = groupsSlice.reducer
export const groupsActions = groupsSlice.actions
