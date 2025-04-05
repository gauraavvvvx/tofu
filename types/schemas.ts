export type Transaction = {
    timestamp: string
    amount: number
    date: string
    category: string
    savings: number
    roundedAmount: number
    transactedTo: string
}

export type savings = {
    savings: number
}

export type categories = {
    name: string
    id: string
    icon: string
}
