import { CallbackBasedPriceWatcher } from './price-watcher/using-callbacks'
import { handleError, handlePriceUpdate } from './common'

process.on('uncaughtException', handleError)

const watcher = new CallbackBasedPriceWatcher(handlePriceUpdate)
watcher.start()
