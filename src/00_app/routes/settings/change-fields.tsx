import { createFileRoute } from '@tanstack/react-router'
import { ChangeFields } from 'src/01_pages/change-fields/ui'
import { SETTINGS_CHANGE_FIELDS_PATH } from 'src/05_shared/api/query-const'

export const Route = createFileRoute(SETTINGS_CHANGE_FIELDS_PATH)({
  component: ChangeFields,
})
