import { CallbackBasedPriceWatcher } from './price-watcher/using-callbacks'
import { withErrorHandling } from './error-handling/for-callbacks'
import { handleError, handlePriceUpdate } from './common'

const watcher = new CallbackBasedPriceWatcher(withErrorHandling(handlePriceUpdate, handleError))
watcher.start()
