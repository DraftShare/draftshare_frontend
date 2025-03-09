import { createFileRoute } from '@tanstack/react-router'
import { DefaultProperties } from 'src/01_pages/default-properties'

export const Route = createFileRoute('/settings/default-properties')({
  component: DefaultProperties,
})
