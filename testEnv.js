import nock from 'nock'

/**
 * Set up console.error override
 */
const { error } = console

const consoleError = function errorOverride(message) {
  // eslint-disable-next-line prefer-rest-params
  error.apply(console, arguments) // keep default behaviour
  throw (message instanceof Error ? message : new Error(message))
}

console.error = consoleError

nock.cleanAll()
nock.disableNetConnect()
