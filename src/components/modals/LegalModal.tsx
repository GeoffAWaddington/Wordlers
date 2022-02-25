import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const LegalModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Our Commitment to You" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        This site will always be free and accessible to everyone
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        This site will never contain advertisements
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        We do not use software which allows tracking or access to your personal information
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        ----------------------------------------------
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Geek Deets:
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        We use Fathom to get our very limited information
      </p>      <p className="text-sm text-gray-500 dark:text-gray-300">
        It is GDPR, CCPA, ePrivacy, PECR compliant
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        ----------------------------------------------
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Please enjoy your time here !
      </p>
    </BaseModal>
  )
}
