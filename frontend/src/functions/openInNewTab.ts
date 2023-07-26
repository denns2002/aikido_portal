export function openInNewTab(url: string): void {
    window.open(`http://localhost:3000${url}`, "_blank", "noopener,noreferrer")
}