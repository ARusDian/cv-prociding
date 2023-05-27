import React from 'react'

interface Props {
  imgSrc: string,
  name: string,
  title: string,
  university: string,
}

const KeynoteCard = ({ imgSrc, name, title, university } : Props) => {
  return (
    <>
      <div className="w-[450px] h-[450px] text-center text-xl">
        <div className="w-[70%] h-[70%] mx-auto mb-4">
          <img src="https://iciep.researchsynergy.org/wp-content/uploads/2019/08/WhatsApp-Image-2019-07-26-at-19.34.12-150x150.jpeg" alt="" className='object-contain w-full h-full' />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className='font-bold text-2xl'>Prof. Orat Dorajat M.Bus Ph.D</p>
          <p className='font-semibold text-xl'>Rector</p>
          <p className='font-semibold text-xl'>Universitas Terbuka</p>
        </div>
      </div>
    </>
  )
}

export default KeynoteCard