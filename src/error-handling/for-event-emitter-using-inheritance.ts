import NativeEventEmitter from 'events'
import { ErrorHandler } from './common'

// if you want to have error handling baked-into your event emitter:

/**
 * Inheritance has some problems, but in this case it seems like the best solution to me.
 */
export class EventEmitterWithErrorHandling extends NativeEventEmitter {
    constructor(
        private readonly errorHandler: ErrorHandler,
    ) {
        super()
    }

    override emit(eventName: string | symbol, ...args: any[]): boolean {
        try {
            return super.emit(eventName, ...args)
        } catch (error) {
            this.errorHandler(error)

            return this.listenerCount(eventName) > 0
        }
    }
}
