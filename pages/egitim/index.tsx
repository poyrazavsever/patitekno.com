import EduCard from '@/components/shared/eduCard'
import React from 'react'

const Egitim = () => {
  return (
    <div>
        
        <div className="flex flex-col items-start gap-6 mt-24">
            <h1 className="text-2xl font-semibold text-primary">Youtube Eğitimleri</h1>
            <EduCard />
        </div>

        <div className="flex flex-col items-start gap-6 mt-36">
            <h1 className="text-2xl font-semibold text-primary">Udemy Eğitimleri</h1>
            <EduCard />
        </div>


    </div>
  )
}

export default Egitim