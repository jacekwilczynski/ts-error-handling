import { generatePriceUpdate, INTERVAL_MS, PriceConsumer, PriceWatcher } from './common'
import { clearInterval } from 'timers'

export class CallbackBasedPriceWatcher implements PriceWatcher {
    // `any` because TS typings for Node timers are inconsistent
    private intervalHandle: any = null

    constructor(
        private readonly onPriceUpdate: PriceConsumer,
    ) {
    }

    start(): void {
        this.intervalHandle = setInterval(() => {
            const priceUpdate = generatePriceUpdate()

            this.onPriceUpdate(priceUpdate)
        }, INTERVAL_MS)
    }

    stop(): void {
        clearInterval(this.intervalHandle)
        this.intervalHandle = null
    }
}
