import generateHandoffs from '../index'

import * as fetchSotoLayers from '../utils/fetchSotoLayers'

describe('UMM-T handoffs', () => {
  test('returns a UMM-T handoff object', async () => {
    jest.spyOn(fetchSotoLayers, 'fetchSotoLayers').mockImplementation(() => Promise.resolve(
      ['GHRSST_L4_MUR_Sea_Surface_Temperature', 'GHRSST_L4_MUR_Sea_Surface_Temperature_Anomalies']
    ))

    const ummT = {
      longName: 'State of the Ocean',
      name: 'SOTO',
      potentialAction: {
        target: {
          urlTemplate: 'https://podaac-tools.jpl.nasa.gov/soto/#b=BlueMarble_ShadedRelief_Bathymetry&l={+layers}&ve={+bbox}&d={+date}'
        },
        queryInput: [
          {
            valueName: 'layers',
            description: 'A comma-separated list of visualization layer ids, as defined by GIBS. These layers will be portrayed on the web application',
            valueRequired: true,
            valueType: 'https://wiki.earthdata.nasa.gov/display/GIBS/GIBS+API+for+Developers#GIBSAPIforDevelopers-LayerNaming'
          },
          {
            valueName: 'date',
            description: 'A UTC ISO DateTime. The layers portrayed will correspond to this date.',
            valueRequired: false,
            valueType: 'https://schema.org/startDate'
          },
          {
            valueName: 'bbox',
            description: 'A spatial bounding box that will set the spatial extent of the portrayed layers. The first point is the lower corner, the second point is the upper corner. A box is expressed as two points separated by a space character.',
            valueRequired: false,
            valueType: 'https://schema.org/box'
          }
        ]
      }
    }

    const collectionGibsLayers = [
      'GHRSST_L4_MUR_Sea_Surface_Temperature',
      'GHRSST_L4_MUR_Sea_Ice_Concentration',
      'GHRSST_L4_MUR_Sea_Surface_Temperature_Anomalies'
    ]

    const searchContext = {
      spatial: {
        boundingBox: ['-77.60234,37.00428,-75.15486,40.06987']
      },
      temporal: {
        startDate: '2021-07-22T00:55:39.384Z'
      }
    }

    // const handoffs = {
    //   sotoLayers: ['GHRSST_L4_MUR_Sea_Surface_Temperature', 'GHRSST_L4_MUR_Sea_Surface_Temperature_Anomalies']
    // }

    const response = await generateHandoffs({
      collectionMetadata: {},
      collectionGibsLayers,
      searchContext,
      ummT
    })

    expect(response).toEqual([
      {
        title: 'State of the Ocean',
        href: 'https://podaac-tools.jpl.nasa.gov/soto/#b=BlueMarble_ShadedRelief_Bathymetry&l=GHRSST_L4_MUR_Sea_Surface_Temperature(la=true),GHRSST_L4_MUR_Sea_Surface_Temperature_Anomalies(la=true)&ve=-77.60234,37.00428,-75.15486,40.06987&d=2021-07-22T00:55:39.384Z'
      }
    ])
  })

  test('does not return a handoff object if all required fields are not present', async () => {
    const ummT = {
      longName: 'State of the Ocean',
      name: 'SOTO',
      potentialAction: {
        target: {
          urlTemplate: 'https://podaac-tools.jpl.nasa.gov/soto/#b=BlueMarble_ShadedRelief_Bathymetry&l={+layers}&ve={+bbox}&d={+date}'
        },
        queryInput: [
          {
            valueName: 'layers',
            description: 'A comma-separated list of visualization layer ids, as defined by GIBS. These layers will be portrayed on the web application',
            valueRequired: true,
            valueType: 'https://wiki.earthdata.nasa.gov/display/GIBS/GIBS+API+for+Developers#GIBSAPIforDevelopers-LayerNaming'
          },
          {
            valueName: 'date',
            description: 'A UTC ISO DateTime. The layers portrayed will correspond to this date.',
            valueRequired: false,
            valueType: 'https://schema.org/startDate'
          },
          {
            valueName: 'bbox',
            description: 'A spatial bounding box that will set the spatial extent of the portrayed layers. The first point is the lower corner, the second point is the upper corner. A box is expressed as two points separated by a space character.',
            valueRequired: false,
            valueType: 'https://schema.org/box'
          }
        ]
      }
    }

    const searchContext = {
      spatial: {
        boundingBox: ['-77.60234,37.00428,-75.15486,40.06987']
      },
      temporal: {
        startDate: '2021-07-22T00:55:39.384Z'
      }
    }

    const handoffs = {
      sotoLayers: []
    }

    const response = await generateHandoffs({
      collectionMetadata: {},
      searchContext,
      ummT,
      handoffs
    })

    expect(response).toEqual([])
  })

  test('does not return a handoff object if no tools exist', async () => {
    const searchContext = {
      spatial: {
        boundingBox: ['-77.60234,37.00428,-75.15486,40.06987']
      },
      temporal: {
        startDate: '2021-07-22T00:55:39.384Z'
      }
    }

    const response = await generateHandoffs({
      collectionMetadata: {},
      searchContext,
      ummT: {}
    })

    expect(response).toEqual([])
  })

  test('does not return a handoff object if no potentialActions exist', async () => {
    const ummT = {
      name: 'Mock tool'
    }

    const searchContext = {
      spatial: {
        boundingBox: ['-77.60234,37.00428,-75.15486,40.06987']
      },
      temporal: {
        startDate: '2021-07-22T00:55:39.384Z'
      }
    }

    const response = await generateHandoffs({
      collectionMetadata: {},
      searchContext,
      ummT
    })

    expect(response).toEqual([])
  })
})
