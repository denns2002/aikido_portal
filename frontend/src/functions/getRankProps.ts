const ranks = {
	"6 кю детский": {backgroundColor: "bg-white", textColor: "text-black", text: "6 кю, дет."},
	"5 кю детский": {backgroundColor: "bg-yellow-300", textColor: "text-black", text: "5 кю, дет."},
	"4 кю детский": {backgroundColor: "bg-orange-600", textColor: "text-white", text: "4 кю, дет."},
	"3 кю детский": {backgroundColor: "bg-green-700", textColor: "text-white", text: "3 кю, дет."},
	"2 кю детский": {backgroundColor: "bg-blue-700", textColor: "text-white", text: "2 кю, дет."},
	"1 кю детский": {backgroundColor: "bg-yellow-900", textColor: "text-white", text: "1 кю, дет."},
	"5 кю": {backgroundColor: "bg-yellow-300", textColor: "text-black", text: "5 кю"},
	"4 кю": {backgroundColor: "bg-orange-600", textColor: "text-white", text: "4 кю"},
	"3 кю": {backgroundColor: "bg-green-700", textColor: "text-white", text: "3 кю"},
	"2 кю": {backgroundColor: "bg-blue-700", textColor: "text-white", text: "2 кю"},
	"1 кю": {backgroundColor: "bg-yellow-900", textColor: "text-white", text: "1 кю"},
	"1 дан": {backgroundColor: "bg-black", textColor: "text-white", text: "1 дан"},
	"2 дан": {backgroundColor: "bg-black", textColor: "text-white", text: "2 дан"},
	"3 дан": {backgroundColor: "bg-black", textColor: "text-white", text: "3 дан"},
	"4 дан": {backgroundColor: "bg-black", textColor: "text-white", text: "4 дан"},
	"5 дан": {backgroundColor: "bg-black", textColor: "text-white", text: "5 дан"},
}

type RanksKey = keyof typeof ranks

interface IRankProps {
    backgroundColor: string
    text: string
    textColor: string
}

export function getRankProps(rank: string): IRankProps {
    return ranks[rank as RanksKey]
}
