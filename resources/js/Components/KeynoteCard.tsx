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
      <div className="w-[320px] h-[350px] text-center text-xl flex flex-col justify-around">
        <div className="w-[65%] h-[70%] mx-auto mb-4 hover:w-[68%] hover:h-[71%] transition-all duration-500">
          <img src={imgSrc} alt="" className='object-cover w-full h-full rounded-md' />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className='font-black text-xl'>{name}</p>
          <p className='font- text-lg italic'>{title}</p>
          <p className='font- text-lg'>{university}</p>
        </div>
      </div>
    </>
  )
}

export default KeynoteCard