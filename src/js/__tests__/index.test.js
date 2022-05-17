import generateHandoffs from '../index'

describe('UMM-T handoffs', () => {
  test('returns a UMM-T handoff object', () => {
    const ummT = {
      name: 'Giovanni',
      longName: 'Giovanni',
      potentialAction: {
        type: 'SearchAction',
        target: {
          type: 'EntryPoint',
          urlTemplate: 'https://giovanni.gsfc.nasa.gov/giovanni/#service=TmAvMp{?dataKeyword,starttime,endtime,bbox}',
          httpMethod: ['GET']
        },
        queryInput: [
          {
            valueName: 'dataKeyword',
            valueRequired: true,
            valueType: 'shortName'
          },
          {
            valueName: 'starttime',
            valueRequired: true,
            valueType: 'https://schema.org/startDate'
          },
          {
            valueName: 'endtime',
            valueRequired: false,
            valueType: 'https://schema.org/endDate'
          },
          {
            valueName: 'bbox',
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

    const response = generateHandoffs({
      collectionMetadata: {
        shortName: 'mockCollection'
      },
      searchContext,
      ummT
    })

    expect(response).toEqual([
      {
        title: 'Giovanni',
        href: 'https://giovanni.gsfc.nasa.gov/giovanni/#service=TmAvMp?dataKeyword=mockCollection&starttime=2021-07-22T00%3A55%3A39.384Z&bbox=-77.60234%2C37.00428%2C-75.15486%2C40.06987'
      }
    ])
  })

  test('does not return a handoff object if all required fields are not present', () => {
    const ummT = {
      name: 'Giovanni',
      longName: 'Giovanni',
      potentialAction: {
        type: 'SearchAction',
        target: {
          type: 'EntryPoint',
          urlTemplate: 'https://giovanni.gsfc.nasa.gov/giovanni/#service=TmAvMp{?dataKeyword,starttime,endtime,bbox}',
          httpMethod: ['GET']
        },
        queryInput: [
          {
            valueName: 'dataKeyword',
            valueRequired: true,
            valueType: 'shortName'
          },
          {
            valueName: 'starttime',
            valueRequired: true,
            valueType: 'https://schema.org/startDate'
          },
          {
            valueName: 'endtime',
            valueRequired: false,
            valueType: 'https://schema.org/endDate'
          },
          {
            valueName: 'bbox',
            valueType: 'https://schema.org/box'
          }
        ]
      }
    }

    const searchContext = {
      spatial: {
        boundingBox: ['-77.60234,37.00428,-75.15486,40.06987']
      }
    }

    const response = generateHandoffs({
      collectionMetadata: {
        shortName: 'mockCollection'
      },
      searchContext,
      ummT
    })

    expect(response).toEqual([])
  })

  test('does not return a handoff object if no tools exist', () => {
    const searchContext = {
      spatial: {
        boundingBox: ['-77.60234,37.00428,-75.15486,40.06987']
      },
      temporal: {
        startDate: '2021-07-22T00:55:39.384Z'
      }
    }

    const response = generateHandoffs({
      collectionMetadata: {},
      searchContext,
      ummT: {}
    })

    expect(response).toEqual([])
  })

  test('does not return a handoff object if no potentialActions exist', () => {
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

    const response = generateHandoffs({
      collectionMetadata: {},
      searchContext,
      ummT
    })

    expect(response).toEqual([])
  })
})
