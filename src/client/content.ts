/* Asset base for the images Home.tsx references from the lab's GitBook repo. */
export const REPO_ASSETS =
    'https://raw.githubusercontent.com/leojacinto/WorkflowDataFabric-TypeB/main/.gitbook/assets'

import { localAsset } from './content/asset-map'

export const asset = (file: string) => localAsset(`${REPO_ASSETS}/${file}`)
