import type { StorybookConfig } from '@storybook-vue/nuxt'

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|mjs|ts|tsx|vue)'],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },
}

export default config

