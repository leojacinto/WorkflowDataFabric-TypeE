/* Asset base for the images Home.tsx references from the lab's GitBook repo. */
export const REPO_ASSETS =
    'https://raw.githubusercontent.com/leojacinto/WorkflowDataFabric-TypeB/main/.gitbook/assets'

import { publicAsset } from './content/public-images'

export const asset = (file: string) => publicAsset(`${REPO_ASSETS}/${file}`)
