import type EventEmitter from 'events'
import { generatePriceUpdate, INTERVAL_MS, PriceWatcher } from './common'
import { clearInterval } from 'timers'

export const PRICE_UPDATE_FETCHED_EVENT = 'price_update_fetched'

export class EventEmitterBasedPriceWatcher implements PriceWatcher {
    private intervalHandle: any = null

    constructor(
        private readonly emitter: EventEmitter,
    ) {
    }

    start(): void {
        this.intervalHandle = setInterval(() => {
            const priceUpdate = generatePriceUpdate()

            this.emitter.emit(PRICE_UPDATE_FETCHED_EVENT, priceUpdate)
        }, INTERVAL_MS)
    }

    stop(): void {
        clearInterval(this.intervalHandle)
        this.intervalHandle = null
    }
}
