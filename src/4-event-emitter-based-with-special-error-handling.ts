import { EventEmitterBasedPriceWatcher, PRICE_UPDATE_FETCHED_EVENT } from './price-watcher/using-event-emitter'
import { EventEmitterWithErrorHandling } from './error-handling/for-event-emitter-using-inheritance'
import { handleError, handlePriceUpdate } from './common'

const emitter = new EventEmitterWithErrorHandling(handleError)
const watcher = new EventEmitterBasedPriceWatcher(emitter)

emitter.on(PRICE_UPDATE_FETCHED_EVENT, handlePriceUpdate)
watcher.start()
