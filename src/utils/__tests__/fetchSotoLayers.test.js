import nock from 'nock'

import { fetchSotoLayers } from '../fetchSotoLayers'
import { sotoResponse } from './mocks'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('fetchSotoLayers', () => {
  test('returns the user\'s contact info', async () => {
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

  test('responds correctly on error', async () => {
    nock(/podaac-tools.jpl.nasa.gov/)
      .get(/soto_capabilities/)
      .reply(500)

    const layers = await fetchSotoLayers()

    expect(layers).toEqual([])
  })
})
