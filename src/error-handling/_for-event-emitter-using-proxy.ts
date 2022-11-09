import EventEmitter from 'events'
import { ErrorHandler } from './common'

/**
 * I probably wouldn't do this since I heard the ES Proxy isn't good for performance.
 */
export function createEmitter(errorHandler: ErrorHandler) {
    return new Proxy(new EventEmitter(), {
        get(nativeEmitter, key: keyof EventEmitter): unknown {
            if (key !== 'emit') {
                return nativeEmitter[key]
            }

            const emit: typeof nativeEmitter.emit = (eventName, ...args) => {
                try {
                    return nativeEmitter.emit(eventName, ...args)
                } catch (error) {
                    errorHandler(error)

                    return nativeEmitter.listenerCount(eventName) > 0
                }
            }

            return emit
        }
    })
}
