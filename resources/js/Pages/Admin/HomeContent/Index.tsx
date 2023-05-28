import React, { useState } from 'react';
import MainDashboardAdminTailwind from '@/Layouts/MainDashboardAdminTailwind'
import "../../../../css/app.css"
import HomeHeader from '@/Components/Dashboard/HomeHeader';
import { useForm } from '@inertiajs/inertia-react';
import moment from 'moment';
import { IHomeGallery, IHomeHeader, IHomeKeynote, IHomePoster, IHomePublication, IHomeSupport } from '@/types';

interface Props {
  header: IHomeHeader,
  keynotes: IHomeKeynote[],
  galleries: IHomeGallery[],
  posters?: IHomePoster[],
  publications: IHomePublication[],
  supportedBy: IHomeSupport[]
}

const Index = ({ header, galleries, keynotes, posters, publications, supportedBy }: Props) => {
  const headerForm = useForm<IHomeHeader>({
    ...header,
    input_logo_path: header?.logo_path || '',
  });
  const keynoteForm = useForm<IHomeKeynote[]>(keynotes);
  const galleryForm = useForm<IHomeGallery[]>(galleries);
  const posterForm = useForm<IHomePoster[]>(posters);
  const publicationForm = useForm<IHomePublication[]>(publications);
  const supportedByForm = useForm<IHomeSupport[]>(supportedBy);

  console.log(headerForm.data)

  return (
    <div className="overflow-hidden font-roboto">
      <MainDashboardAdminTailwind>
        <p className='font-bold text-2xl'>Home</p>
        <div className="flex flex-col gap-4 mt-4 px-2">
          <hr className='border-b border-b-black' />
          <HomeHeader headerForm={headerForm} header={header}/>
          <hr className='border-b border-b-black mt-2' />
        </div>
      </MainDashboardAdminTailwind>
    </div>
  )
}

export default Index