import { getDateFilter } from "./getDateFilter";

export function isEventOpen(date: string): boolean {
    const today = getDateFilter()

    return date > today
}