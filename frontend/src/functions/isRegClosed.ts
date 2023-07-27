import { getDateFilter } from "./getDateFilter";

export function isRegClosed(date: string): boolean {
    const today = getDateFilter()

    return date < today
}