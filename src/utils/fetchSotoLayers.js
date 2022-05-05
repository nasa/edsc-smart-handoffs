import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

/**
 * Fetches the SOTO Capabilities document and returns an array of supported GIBS layers
 */
export const fetchSotoLayers = async () => {
  // Fetch the SOTO Capabilities document
  const capabilitiesUrl = 'https://podaac-tools.jpl.nasa.gov/soto/default-data/soto_capabilities.xml'

  try {
    const sotoResponse = await axios({
      method: 'get',
      url: capabilitiesUrl
    })

    const parser = new XMLParser()

    const parsedCapabilities = parser.parse(sotoResponse.data, {
      ignoreAttributes: false,
      attributeNamePrefix: ''
    })

    const { Capabilities: capabilities = {} } = parsedCapabilities
    const { Contents: contents = {} } = capabilities
    let { Layer: capabilityLayers = [] } = contents

    capabilityLayers = [].concat(capabilityLayers).filter(Boolean).map((layer) => layer['ows:Identifier'])

    return capabilityLayers
  } catch (e) {
    console.log('Error fetching SOTO layers', e)

    return []
  }
}
