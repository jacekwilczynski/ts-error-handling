import { ErrorHandler } from './common'

// if you want easily hook up a specific error handler for some callbacks only:

export function withErrorHandling<Args extends unknown[]>(
    wrappedOperation: (...args: Args) => void,
    errorHandler: ErrorHandler,
) {
    return function (...args: Args) {
        try {
            return wrappedOperation(...args)
        } catch (error) {
            errorHandler(error)
        }
    }
}
