import { getHandoffValue } from '../getHandoffValue'
import * as fetchSotoLayers from '../utils/fetchSotoLayers'

describe('getHandoffValue', () => {
  describe('When the value is a conceptId', () => {
    test('returns the value', async () => {
      const collectionMetadata = {
        conceptId: 'testId'
      }

      const handoffInput = {
        valueType: 'conceptId'
      }

      expect(await getHandoffValue({
        collectionMetadata,
        handoffInput
      })).toEqual('testId')
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'conceptId'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is a bounding box', () => {
    test('returns the value for bounding box spatial as an array', async () => {
      const searchContext = {
        spatial: {
          boundingBox: ['-77.60234,37.00428,-75.15486,40.06987']
        }
      }

      const handoffInput = {
        valueType: 'https://schema.org/box'
      }

      expect(await getHandoffValue({
        searchContext,
        handoffInput
      })).toEqual('-77.60234,37.00428,-75.15486,40.06987')
    })

    test('returns the value for bounding box spatial as a string', async () => {
      const searchContext = {
        spatial: {
          boundingBox: '-77.60234,37.00428,-75.15486,40.06987'
        }
      }

      const handoffInput = {
        valueType: 'https://schema.org/box'
      }

      expect(await getHandoffValue({
        searchContext,
        handoffInput
      })).toEqual('-77.60234,37.00428,-75.15486,40.06987')
    })

    test('returns the value for circle spatial', async () => {
      const searchContext = {
        spatial: {
          circle: ['-77.60234,37.00428,20000']
        }
      }

      const handoffInput = {
        valueType: 'https://schema.org/box'
      }

      expect(await getHandoffValue({
        searchContext,
        handoffInput
      })).toEqual('-77.82731518274353,36.8246169445857,-77.37736481725646,37.183943055414304')
    })

    test('returns the value for point spatial', async () => {
      const searchContext = {
        spatial: {
          point: ['-77.60234,37.00428']
        }
      }

      const handoffInput = {
        valueType: 'https://schema.org/box'
      }

      expect(await getHandoffValue({
        searchContext,
        handoffInput
      })).toEqual('-77.60234000999999,37.00427999,-77.60233999,37.00428001')
    })

    test('returns the value for polygon spatial', async () => {
      const searchContext = {
        spatial: {
          polygon: ['-77.04197,39.06811,-77.22704,38.94289,-77.01776,38.74591,-76.79505,38.93737,-77.04197,39.06811']
        }
      }

      const handoffInput = {
        valueType: 'https://schema.org/box'
      }

      expect(await getHandoffValue({
        searchContext,
        handoffInput
      })).toEqual('-77.22704000000003,38.745909999999995,-76.79505000000003,39.06811000000002')
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'https://schema.org/box'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is minx', () => {
    test('returns the value', async () => {
      const searchContext = {
        spatial: {
          boundingBox: ['-77.60234,37.00428,-75.15486,40.06987']
        }
      }

      const handoffInput = {
        valueType: 'minx'
      }

      expect(await getHandoffValue({
        searchContext,
        handoffInput
      })).toEqual(-77.60234)
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'minx'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is miny', () => {
    test('returns the value', async () => {
      const searchContext = {
        spatial: {
          boundingBox: ['-77.60234,37.00428,-75.15486,40.06987']
        }
      }

      const handoffInput = {
        valueType: 'miny'
      }

      expect(await getHandoffValue({
        searchContext,
        handoffInput
      })).toEqual(37.00428)
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'miny'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is maxx', () => {
    test('returns the value', async () => {
      const searchContext = {
        spatial: {
          boundingBox: ['-77.60234,37.00428,-75.15486,40.06987']
        }
      }

      const handoffInput = {
        valueType: 'maxx'
      }

      expect(await getHandoffValue({
        searchContext,
        handoffInput
      })).toEqual(-75.15486)
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'maxx'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is maxy', () => {
    test('returns the value', async () => {
      const searchContext = {
        spatial: {
          boundingBox: ['-77.60234,37.00428,-75.15486,40.06987']
        }
      }

      const handoffInput = {
        valueType: 'maxy'
      }

      expect(await getHandoffValue({
        searchContext,
        handoffInput
      })).toEqual(40.06987)
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'maxy'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is a start time', () => {
    test('returns the value', async () => {
      const searchContext = {
        temporal: {
          startDate: '2021-07-22T00:55:39.384Z'
        }
      }

      const handoffInput = {
        valueType: 'https://schema.org/startDate'
      }

      expect(await getHandoffValue({
        searchContext,
        handoffInput
      })).toEqual('2021-07-22T00:55:39.384Z')
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'https://schema.org/startDate'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is a start date', () => {
    test('returns the value', async () => {
      const searchContext = {
        temporal: {
          startDate: '2021-07-22T00:55:39.384Z'
        }
      }

      const handoffInput = {
        valueType: 'startDate'
      }

      expect(await getHandoffValue({
        searchContext,
        handoffInput
      })).toEqual('2021-07-22')
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'startDate'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is an end time', () => {
    test('returns the value', async () => {
      const searchContext = {
        temporal: {
          endDate: '2021-07-22T00:55:39.384Z'
        }
      }

      const handoffInput = {
        valueType: 'https://schema.org/endDate'
      }

      expect(await getHandoffValue({
        searchContext,
        handoffInput
      })).toEqual('2021-07-22T00:55:39.384Z')
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'https://schema.org/endDate'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is an end date', () => {
    test('returns the value', async () => {
      const searchContext = {
        temporal: {
          endDate: '2021-07-22T00:55:39.384Z'
        }
      }

      const handoffInput = {
        valueType: 'endDate'
      }

      expect(await getHandoffValue({
        searchContext,
        handoffInput
      })).toEqual('2021-07-22')
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'endDate'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is a temporalRange', () => {
    test('returns the value', async () => {
      const searchContext = {
        temporal: {
          endDate: '2021-07-25T00:55:39.384Z',
          startDate: '2021-07-22T00:00:00.000Z'
        }
      }

      const handoffInput = {
        valueType: 'temporalRange'
      }

      expect(await getHandoffValue({
        searchContext,
        handoffInput
      })).toEqual('2021-07-22T00:00:00.000Z,2021-07-25T00:55:39.384Z')
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'temporalRange'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is a layer', () => {
    test('returns the value', async () => {
      jest.spyOn(fetchSotoLayers, 'fetchSotoLayers').mockImplementation(() => Promise.resolve(
        ['GHRSST_L4_MUR_Sea_Surface_Temperature', 'GHRSST_L4_MUR_Sea_Surface_Temperature_Anomalies']
      ))

      const collectionGibsLayers = [
        'GHRSST_L4_MUR_Sea_Surface_Temperature',
        'GHRSST_L4_MUR_Sea_Ice_Concentration',
        'GHRSST_L4_MUR_Sea_Surface_Temperature_Anomalies'
      ]

      const handoffInput = {
        valueType: 'https://wiki.earthdata.nasa.gov/display/GIBS/GIBS+API+for+Developers#GIBSAPIforDevelopers-LayerNaming'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        collectionGibsLayers,
        searchContext: {},
        handoffInput
      })).toEqual([
        'GHRSST_L4_MUR_Sea_Surface_Temperature(la=true)',
        'GHRSST_L4_MUR_Sea_Surface_Temperature_Anomalies(la=true)'
      ])
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffs = {
        sotoLayers: []
      }
      const handoffInput = {
        valueType: 'https://wiki.earthdata.nasa.gov/display/GIBS/GIBS+API+for+Developers#GIBSAPIforDevelopers-LayerNaming'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput,
        handoffs
      })).toEqual(undefined)
    })
  })

  describe('When the value is a shortName', () => {
    test('returns the value', async () => {
      const collectionMetadata = {
        shortName: 'Mock short name'
      }

      const handoffInput = {
        valueType: 'shortName'
      }

      expect(await getHandoffValue({
        collectionMetadata,
        searchContext: {},
        handoffInput
      })).toEqual('Mock short name')
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'shortName'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is a mapProjection', () => {
    test('returns geographic when the project is epsg4326', async () => {
      const handoffInput = {
        valueType: 'mapProjection'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            projection: 'epsg4326'
          }
        },
        handoffInput
      })).toEqual('geographic')
    })

    test('returns arctic when the project is epsg3413', async () => {
      const handoffInput = {
        valueType: 'mapProjection'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            projection: 'epsg3413'
          }
        },
        handoffInput
      })).toEqual('arctic')
    })

    test('returns antarctic when the project is epsg3031', async () => {
      const handoffInput = {
        valueType: 'mapProjection'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            projection: 'epsg3031'
          }
        },
        handoffInput
      })).toEqual('antarctic')
    })

    test('returns geographic when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'mapProjection'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual('geographic')
    })
  })

  describe('When the value is a mapProjection using epsg codes', () => {
    test('returns EPSG:4326 when the project is epsg4326', async () => {
      const handoffInput = {
        valueType: 'https://spatialreference.org/ref/epsg/'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            projection: 'epsg4326'
          }
        },
        handoffInput
      })).toEqual('EPSG:4326')
    })

    test('returns EPSG:3413 when the project is epsg3413', async () => {
      const handoffInput = {
        valueType: 'https://spatialreference.org/ref/epsg/'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            projection: 'epsg3413'
          }
        },
        handoffInput
      })).toEqual('EPSG:3413')
    })

    test('returns EPSG:3031 when the project is epsg3031', async () => {
      const handoffInput = {
        valueType: 'https://spatialreference.org/ref/epsg/'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            projection: 'epsg3031'
          }
        },
        handoffInput
      })).toEqual('EPSG:3031')
    })

    test('returns EPSG:4326 when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'https://spatialreference.org/ref/epsg/'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual('EPSG:4326')
    })
  })

  describe('When the value is a latitude', () => {
    test('returns the value', async () => {
      const handoffInput = {
        valueType: 'https://schema.org/latitude'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            latitude: 0
          }
        },
        handoffInput
      })).toEqual(0)
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'https://schema.org/latitude'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is a longitude', () => {
    test('returns the value', async () => {
      const handoffInput = {
        valueType: 'https://schema.org/longitude'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            longitude: 0
          }
        },
        handoffInput
      })).toEqual(0)
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'https://schema.org/longitude'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is a zoom', () => {
    test('returns the value', async () => {
      const handoffInput = {
        valueType: 'zoom'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            zoom: 0
          }
        },
        handoffInput
      })).toEqual(0)
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'zoom'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is a edscBaseLayer', () => {
    test('returns blueMarble', async () => {
      const handoffInput = {
        valueType: 'edscBaseLayer'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            base: {
              blueMarble: true
            }
          }
        },
        handoffInput
      })).toEqual('blueMarble')
    })

    test('returns trueColor', async () => {
      const handoffInput = {
        valueType: 'edscBaseLayer'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            base: {
              trueColor: true
            }
          }
        },
        handoffInput
      })).toEqual('trueColor')
    })

    test('returns landWaterMap', async () => {
      const handoffInput = {
        valueType: 'edscBaseLayer'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            base: {
              landWaterMap: true
            }
          }
        },
        handoffInput
      })).toEqual('landWaterMap')
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'edscBaseLayer'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is a edscOverlayLayers', () => {
    test('returns coastlines', async () => {
      const handoffInput = {
        valueType: 'edscOverlayLayers'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            overlays: {
              coastlines: true
            }
          }
        },
        handoffInput
      })).toEqual('coastlines')
    })

    test('returns referenceFeatures', async () => {
      const handoffInput = {
        valueType: 'edscOverlayLayers'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            overlays: {
              referenceFeatures: true
            }
          }
        },
        handoffInput
      })).toEqual('referenceFeatures')
    })

    test('returns referenceLabels', async () => {
      const handoffInput = {
        valueType: 'edscOverlayLayers'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            overlays: {
              referenceLabels: true
            }
          }
        },
        handoffInput
      })).toEqual('referenceLabels')
    })

    test('returns multiple layers', async () => {
      const handoffInput = {
        valueType: 'edscOverlayLayers'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          map: {
            overlays: {
              coastlines: true,
              referenceFeatures: true,
              referenceLabels: true
            }
          }
        },
        handoffInput
      })).toEqual('coastlines,referenceFeatures,referenceLabels')
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'edscOverlayLayers'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })

  describe('When the value is a edscTextQuery', () => {
    test('returns the value', async () => {
      const handoffInput = {
        valueType: 'edscTextQuery'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {
          keyword: 'mock keyword'
        },
        handoffInput
      })).toEqual('mock keyword')
    })

    test('returns undefined when the value doesn\t exist', async () => {
      const handoffInput = {
        valueType: 'edscTextQuery'
      }

      expect(await getHandoffValue({
        collectionMetadata: {},
        searchContext: {},
        handoffInput
      })).toEqual(undefined)
    })
  })
})
