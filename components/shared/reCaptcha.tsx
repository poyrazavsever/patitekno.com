import ReCAPTCHA from 'react-google-recaptcha-v2'

type RecaptchaModalProps = {
  isOpen: boolean
  onClose: () => void
  onVerify: (token: string | null) => void
}

const RecaptchaModal = ({ isOpen, onClose, onVerify }: RecaptchaModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 h-screen bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-backgroundDark dark:border dark:border-gray-600 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 dark:text-textColorDark">Lütfen insan olduğunuzu doğrulayın</h3>
        <div className="flex flex-col items-center gap-4">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
            onChange={onVerify}
          />
          <button
            onClick={onClose}
            className="text-sm text-gray-500 dark:text-gray-100 dark:hover:text-gray-300 hover:text-gray-900 cursor-pointer"
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecaptchaModal