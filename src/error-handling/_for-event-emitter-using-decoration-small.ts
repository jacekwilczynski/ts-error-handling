import type NativeEventEmitter from 'events'
import { ErrorHandler } from './common'

/**
 * According to the Interface Segregation Principle (4th from SOLID), we should depend only on things we need,
 * so if some code only uses an emitter to emit events (not to attach listeners etc.), then we can leverage
 * TypeScript's structural type system and create a smaller interface.
 */
export type Emitter = Pick<NativeEventEmitter, 'emit'>

/**
 * This solution combines the small size of the inheritance-based solution with the decoupling
 * and runtime flexibility of the decorator pattern.
 */
export class EventEmitterWithErrorHandling implements Emitter {
    constructor(
        private readonly decorated: Emitter,
        private readonly errorHandler: ErrorHandler,
    ) {
    }

    emit(eventName: string | symbol, ...args: any[]): boolean {
        try {
            return this.decorated.emit(eventName, ...args)
        } catch (error) {
            this.errorHandler(error)

            // The return value means "were there any listeners". If we got an error, there must have been at least one.
            return true
        }
    }
}
