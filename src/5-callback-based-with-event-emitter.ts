import EventEmitter from 'events'
import { EventEmitterBasedPriceWatcher, PRICE_UPDATE_FETCHED_EVENT } from './price-watcher/using-event-emitter'
import { handleError, handlePriceUpdate } from './common'
import { withErrorHandling } from './error-handling/for-callbacks'

const emitter = new EventEmitter()
const watcher = new EventEmitterBasedPriceWatcher(emitter)

emitter.on(PRICE_UPDATE_FETCHED_EVENT, withErrorHandling(handlePriceUpdate, handleError))
watcher.start()
