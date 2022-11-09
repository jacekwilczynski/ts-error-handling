import EventEmitter from 'events'
import { EventEmitterBasedPriceWatcher, PRICE_UPDATE_FETCHED_EVENT } from './price-watcher/using-event-emitter'
import { handleError, handlePriceUpdate } from './common'

process.on('uncaughtException', handleError)

const emitter = new EventEmitter()
const watcher = new EventEmitterBasedPriceWatcher(emitter)

emitter.on(PRICE_UPDATE_FETCHED_EVENT, handlePriceUpdate)
watcher.start()
