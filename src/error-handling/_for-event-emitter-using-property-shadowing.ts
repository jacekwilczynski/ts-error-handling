import EventEmitter from 'events'
import { ErrorHandler } from './common'

/**
 * This looks a bit hacky.
 */
export function createEmitter(errorHandler: ErrorHandler) {
    const emitter = new EventEmitter()

    emitter.emit = function (eventName, ...args) {
        try {
            return EventEmitter.prototype.emit(eventName, ...args)
        } catch (error) {
            errorHandler(error)

            return emitter.listenerCount(eventName) > 0
        }
    }

    return emitter
}
