import type { Meta, StoryObj } from '@storybook/vue3'
import ReproButton from './ReproButton.vue'

const meta = {
  title: 'Reproduction/ReproButton',
  component: ReproButton,
  args: { label: 'Storybook preview' },
} satisfies Meta<typeof ReproButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

