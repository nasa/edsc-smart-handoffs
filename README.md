# Earthdata Search Components: Smart Handoffs

[![npm version](https://badge.fury.io/js/%40edsc%2Fsmart-handoffs.svg)](https://badge.fury.io/js/%40edsc%2Fsmart-handoffs)
![Build Status](https://github.com/nasa/edsc-smart-handoffs/workflows/CI/badge.svg?branch=main)
[![codecov](https://codecov.io/gh/nasa/edsc-smart-handoffs/branch/main/graph/badge.svg?token=3NMM9LWW7N)](https://codecov.io/gh/nasa/edsc-smart-handoffs)

Smart handoffs allow users to link from one application to another while carrying with them certain parameters that set a specific context (e.g. open up the same dataset, temporal range, and spatial search in a new tool). This code simplifies the creation of smart handoff links.

The edsc-smart-handoffs plugin was developed as a component of
[Earthdata Search](https://github.com/nasa/earthdata-search).

## Installation

    npm install @edsc/smart-handoffs

## Usage

    import generateHandoffs from '@edsc/smart-handoffs'

    const handoffUrl = generateHandoffs({
      collectionMetadata,
      searchContext,
      ummT
    })

### Parameters

* collectionMetadata: Collection metadata from CMR in UMM-C format
  * Currently only `conceptId` and `shortName` are used.
* searchContext: Collection Search context
* ummT: The collection's associated UMM-T record

## Search Context Object

The searchContext parameter is an object containing your user's current search context. Follow the example object below for formatting.

    searchContext: {
      keyword: '', // Keyword query to be used for searching
      map: {
        projection: 'epsg3413', // Current map project epsg code
        latitude: 38.883, // Latitude of current interest point, center of map, etc.
        longitude: -77.0163, // Longitude of current interest point, center of map, etc.
        zoom: 3, // Zoom level of map
        base: { // Base layer for map to use
          blueMarble: true
        },
        overlays: { // Overlay layers for map to enable
          referenceFeatures: true,
          referenceLabels: true
        }
      },
      temporal: {
        endDate: '2022-01-01', // any format parseable by moment.utc()
        startDate: '2022-01-31' // any format parseable by moment.utc()
      }
      spatial: {
        // Can provide any of the following spatial types
        // String or array values accepted (only first value in array will be used)
        boundingBox: '-77.60234,37.00428,-75.15486,40.06987',
        circle,
        point,
        polygon
      },
    }

## Contributing

See CONTRIBUTING.md

## License

> Copyright © 2007-2014 United States Government as represented by the Administrator of the National Aeronautics and Space Administration. All Rights Reserved.
>
> Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
> You may obtain a copy of the License at
>
>    http://www.apache.org/licenses/LICENSE-2.0
>
>Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
>WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
