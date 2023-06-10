import React from 'react'

interface Props {
  id: number,
  imgSrc: string,
  alt?: string,
  setGalleryIndex?: React.Dispatch<React.SetStateAction<number>>,
  setOpenGalleryModal?: React.Dispatch<React.SetStateAction<boolean>>
}

const GalleryCard = ({ id, imgSrc, alt, setGalleryIndex, setOpenGalleryModal }: Props) => {
  return (
    <div className='sm:h-[250px] md:h-[170px] lg:h-[200px] w-full rounded-lg hover:opacity-90'>
      <img src={imgSrc} alt={alt ? alt : "AWKOAKWOAKWO"} className='object-cover h-full w-full rounded-lg' onClick={() => {
        setOpenGalleryModal(true);
        setGalleryIndex(id)
      }}/>
    </div>
  )
}

export default GalleryCard