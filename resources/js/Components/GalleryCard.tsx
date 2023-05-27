import React from 'react'

interface Props {
  imgSrc: string,
  alt?: string
}

const GalleryCard = ({ imgSrc, alt }: Props) => {
  return (
    <div className='h-[200px] w-[100%] rounded-lg hover:opacity-90'>
      <img src={imgSrc} alt={alt ? alt : "AWKOAKWOAKWO"} className='object-cover h-full w-full rounded-lg'/>
    </div>
  )
}

export default GalleryCard