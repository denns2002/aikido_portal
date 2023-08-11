import { IAccessRoles, IProfile } from "../store/types"

export function doesHaveAccessRole(
	profile: IProfile,
	accessRoles: IAccessRoles
): boolean {
	if (profile.is_trainer && accessRoles.is_trainer) {
		return true
	} else if (profile.is_manager && accessRoles.is_manager) {
		return true
	} else {
		return false
	}
}
