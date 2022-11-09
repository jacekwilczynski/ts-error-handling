import type EventEmitterInterface from 'events'
import { ErrorHandler } from './common'

/**
 * This is what the decorator pattern looks like if you're trying to decorate something that has so many methods...
 * So I wouldn't use it in this case.
 */
export class EventEmitterWithErrorHandling implements EventEmitterInterface {
    constructor(
        private readonly decorated: EventEmitterInterface,
        private readonly errorHandler: ErrorHandler,
    ) {
    }

    emit(eventName: string | symbol, ...args: any[]): boolean {
        try {
            return this.decorated.emit(eventName, ...args)
        } catch (error) {
            this.errorHandler(error)

            return this.decorated.listenerCount(eventName) > 0
        }
    }

    addListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
        this.decorated.addListener(eventName, listener)

        return this
    }

    eventNames(): Array<string | symbol> {
        return this.decorated.eventNames()
    }

    getMaxListeners(): number {
        return this.decorated.getMaxListeners()
    }

    listenerCount(eventName: string | symbol): number {
        return this.decorated.listenerCount(eventName)
    }

    listeners(eventName: string | symbol): Function[] {
        return this.decorated.listeners(eventName)
    }

    off(eventName: string | symbol, listener: (...args: any[]) => void): this {
        this.decorated.off(eventName, listener)

        return this
    }

    on(eventName: string | symbol, listener: (...args: any[]) => void): this {
        this.decorated.on(eventName, listener)

        return this
    }

    once(eventName: string | symbol, listener: (...args: any[]) => void): this {
        this.decorated.on(eventName, listener)

        return this
    }

    prependListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
        this.decorated.prependListener(eventName, listener)

        return this
    }

    prependOnceListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
        this.decorated.prependOnceListener(eventName, listener)

        return this
    }

    rawListeners(eventName: string | symbol): Function[] {
        return this.decorated.rawListeners(eventName)
    }

    removeAllListeners(event?: string | symbol): this {
        this.decorated.removeAllListeners(event)

        return this
    }

    removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
        this.decorated.removeListener(eventName, listener)

        return this
    }

    setMaxListeners(n: number): this {
        this.decorated.setMaxListeners(n)

        return this
    }
}
