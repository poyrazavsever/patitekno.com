import React from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'

type HCaptchaModalProps = {
  isOpen: boolean
  onClose: () => void
  onVerify: (token: string | null) => void
}

const HCaptchaModal = ({ isOpen, onClose, onVerify }: HCaptchaModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="mb-4 text-lg font-semibold">Lütfen robot olmadığınızı doğrulayın</h2>
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
          onVerify={onVerify}
        />
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          İptal
        </button>
      </div>
    </div>
  )
}

export default HCaptchaModal