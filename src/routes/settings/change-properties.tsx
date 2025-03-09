import { createFileRoute } from '@tanstack/react-router'
import { SettingsChangeProperties } from 'src/01_pages/settings-change-properties'

export const Route = createFileRoute('/settings/change-properties')({
  component: SettingsChangeProperties,
})
