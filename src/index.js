import { isEmpty } from 'lodash'
import template from 'url-template'

import { getHandoffValue } from './getHandoffValue'

/**
 * Generate an array of objects that will be used to render smart handoff links
 * @param {Object} params
 * @param {Array} params.collectionGibsLayers GIBS Layer names associated with the collection
 * @param {Object} params.collectionMetadata Collection metadata from CMR
 * @param {Object} params.searchContext Collection Search context
 * @param {Object} params.ummT UMM-T record
 */
const generateHandoffs = async ({
  collectionGibsLayers,
  collectionMetadata,
  searchContext,
  ummT
}) => {
  const handoffLinks = []

  let allRequiredItemsPresent = true

  const {
    longName,
    potentialAction
  } = ummT

  // If no potentialAction exists, no link should be generated
  if (!potentialAction) {
    return []
  }

  const {
    target,
    queryInput
  } = potentialAction

  const { urlTemplate } = target
  const handoffUrl = template.parse(urlTemplate)
  const urlValues = {}

  // Loop through each input and replace the input value in the urlTemplate to create the URL
  await Promise.all(queryInput.map(async (input) => {
    const {
      valueName,
      valueRequired = false
    } = input

    const value = await getHandoffValue({
      collectionGibsLayers,
      collectionMetadata,
      searchContext,
      handoffInput: input
    })

    if (valueRequired && isEmpty(value)) {
      allRequiredItemsPresent = false
    }

    // Add the value to be expanded onto the urlTemplate later
    urlValues[valueName] = value
  }))

  // If all the required inputs are present, push the generated link onto handoffLinks to be returned
  if (allRequiredItemsPresent) {
    handoffLinks.push({
      title: longName,
      href: handoffUrl.expand(urlValues)
    })
  }

  return handoffLinks
}

export default generateHandoffs
