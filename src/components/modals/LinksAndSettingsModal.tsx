import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  handleIsEasyMode:  () => void
  isEasyMode: boolean
}

export const LinksAndSettingsModal = ({ isOpen, handleClose, handleIsEasyMode, isEasyMode }: Props) => {
  const buttonText = isEasyMode ? "Easy Mode" : "Hard Mode";

  return (
    <BaseModal title="Links and Settings" isOpen={isOpen} handleClose={handleClose}>
         <button
            type="button"
            className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-slate-200 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-sm"
            onClick={() => {handleIsEasyMode()}}
          >
          {buttonText}
          </button>
    </BaseModal>
  )
}
