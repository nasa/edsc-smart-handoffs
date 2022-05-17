import { isEmpty } from 'lodash'
import template from 'url-template'

import { getHandoffValue } from './getHandoffValue'

/**
 * Generate an array of objects that will be used to render smart handoff links
 * @param {Object} params
 * @param {Object} params.collectionMetadata Collection metadata from CMR
 * @param {Object} params.searchContext Collection Search context
 * @param {Object} params.ummT UMM-T record
 */
const generateHandoffs = ({
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
  queryInput.forEach((input) => {
    const {
      valueName,
      valueRequired = false
    } = input

    const value = getHandoffValue({
      collectionMetadata,
      searchContext,
      handoffInput: input
    })

    if (valueRequired && isEmpty(value)) {
      allRequiredItemsPresent = false
    }

    // Add the value to be expanded onto the urlTemplate later
    urlValues[valueName] = value
  })

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
