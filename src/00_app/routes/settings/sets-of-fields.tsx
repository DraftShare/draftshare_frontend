import { createFileRoute } from '@tanstack/react-router'
import { SetsOfFields } from 'src/01_pages/sets-of-fields/ui'
import { SETTINGS_SETS_OF_FIELDS_PATH } from 'src/05_shared/api/query-const'

export const Route = createFileRoute(SETTINGS_SETS_OF_FIELDS_PATH)({
  component: SetsOfFields,
  
})
