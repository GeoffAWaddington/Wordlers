import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const LinksAndSettingsModal = ({isOpen, handleClose}: Props) => {
  return (
    <BaseModal title="Links and Settings" isOpen={isOpen} handleClose={handleClose}>
     <p className="text-sm text-gray-500 dark:text-gray-300">
        This modal will contain links and settings
      </p>

    </BaseModal>
  )
}
