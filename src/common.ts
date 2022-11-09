import { PriceUpdate } from './price-watcher/common'

export function handlePriceUpdate(update: PriceUpdate) {
    if (Math.random() >= 0.5) {
        throw new Error('random error')
    }

    console.log('new price!', update)
}

export function handleError(error: unknown) {
    console.error('oops!', error)
}
