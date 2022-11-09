export function generatePriceUpdate() {
    return {
        price: 21.37,
        pairSymbol: 'JP2GMD',
    }
}

export const INTERVAL_MS = 500

export interface PriceWatcher {
    start(): void

    stop(): void
}

export interface PriceUpdate {
    pairSymbol: string
    price: number
}

export interface PriceConsumer {
    (update: PriceUpdate): void
}
