import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    // We use the same variable names you defined in your .env file
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET
  },
  deployment: {
    autoUpdates: true,
  }
})