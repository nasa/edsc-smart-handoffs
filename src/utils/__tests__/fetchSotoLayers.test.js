import nock from 'nock'

import { fetchSotoLayers } from '../fetchSotoLayers'
import { emptyResponse, sotoResponse } from './mocks'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('fetchSotoLayers', () => {
  test('returns the SOTO layers', async () => {
    nock(/podaac-tools.jpl.nasa.gov/)
      .get(/soto_capabilities/)
      .reply(200, sotoResponse)

    const layers = await fetchSotoLayers()

    const expectedLayers = [
      'MODIS_Terra_L3_SST_Thermal_4km_Day_Daily',
      'MODIS_Terra_L3_SST_Thermal_4km_Night_Daily',
      'MODIS_Aqua_L3_SST_Thermal_4km_Day_Daily',
      'MODIS_Aqua_L3_SST_Thermal_4km_Night_Daily',
      'GHRSST_L4_MUR_Sea_Surface_Temperature_Anomalies'
    ]

    expect(layers).toEqual(expectedLayers)
  })

  test('returns no layers when the response has to layers', async () => {
    nock(/podaac-tools.jpl.nasa.gov/)
      .get(/soto_capabilities/)
      .reply(200, emptyResponse)

    const layers = await fetchSotoLayers()

    expect(layers).toEqual([])
  })

  test('responds correctly on error', async () => {
    nock(/podaac-tools.jpl.nasa.gov/)
      .get(/soto_capabilities/)
      .reply(500)

    const layers = await fetchSotoLayers()

    expect(layers).toEqual([])
  })
})
