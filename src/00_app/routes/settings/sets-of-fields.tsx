import { createFileRoute } from '@tanstack/react-router'
import { SetsOfFields } from 'src/01_pages/sets-of-fields/ui'

export const Route = createFileRoute('/settings/sets-of-fields')({
  component: SetsOfFields,
  
})
