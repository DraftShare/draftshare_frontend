import { createFileRoute } from '@tanstack/react-router'
import { ChangeFields } from 'src/01_pages/change-fields/ui'

export const Route = createFileRoute('/settings/change-fields')({
  component: ChangeFields,
})
