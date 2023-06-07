import React from 'react'

interface Props {
  imgSrc: string,
  alt?: string
}

const GalleryCard = ({ imgSrc, alt }: Props) => {
  return (
    <div className='sm:h-[250px] md:h-[170px] lg:h-[200px] w-full rounded-lg hover:opacity-90'>
      <img src={imgSrc} alt={alt ? alt : "AWKOAKWOAKWO"} className='object-cover h-full w-full rounded-lg '/>
    </div>
  )
}

export default GalleryCard