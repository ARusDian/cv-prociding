import { useForm } from '@inertiajs/inertia-react'
import React from 'react'
import route from 'ziggy-js'
import { IHomeHeader, IHomeHeaderForm } from '@/Models/Home'
import MainDashboardAdminTailwind from '@/Layouts/MainDashboardAdminTailwind'

interface Props {
  header: IHomeHeader
}

const Header = ({ header }: Props) => {
  const headerForm = useForm<IHomeHeaderForm>({
    ...header,
    input_logo_path: header?.logo_path || '',
  });
  const [previewImage, setPreviewImage] = React.useState<string | undefined>(headerForm.data.logo_path);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  const headSubmit = () => {
    headerForm.clearErrors();
    if (!header) {
      headerForm.post(route('home.header.store'), {
        onStart: () => setLoading(true),
        onSuccess: () => {
          setLoading(false);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
        },
        onError: (err) => console.error(err),
      });
    } else {
      // @ts-ignore
      headerForm.data._method = 'PUT';
      headerForm.post(route('home.header.update', header.id), {
        onError: (err) => console.error(err),
      })
    }
  }

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewImage(URL.createObjectURL(e.target?.files![0]));
    headerForm.setData("input_logo_path", e.target?.files![0]);
  }

  return (
    <MainDashboardAdminTailwind>
      <div className="overflow-hidden font-roboto flex flex-col gap-4 mt-4 px-2">
        <hr className='border-b border-b-black' />
        <div id='head-content' className="flex flex-row">
          <div className="flex flex-col gap-4 items-start px-2 w-[50%]">
            <h1 className='font-semibold text-2xl'>Header</h1>
            <div className="flex flex-row items-center gap-6">
              <p className='w-[100px]'>Logo : </p>
              <input type="file" name='logo_path' className="rounded-lg w-96 border border-green-900 file:bg-green-500 file:py-2 file:px-4 file:mr-4 file:border-none file:hover:cursor-pointer file:placeholder:" accept='.jpg, .jpeg, .png' onChange={inputChangeHandler} />
            </div>
            <div className="flex flex-row items-center gap-6">
              <p className='w-[100px]'>Date Stamp : </p>
              <input type="date" name='date_stamp' className='w-96 rounded-lg' value={headerForm.data.date_stamp} onChange={(e) => headerForm.setData("date_stamp", e.target.value)} />
            </div>
            <div className="flex flex-row items-center gap-6">
              <p className='w-[100px]'>Title : </p>
              <textarea name='title' className='w-96 rounded-lg h-24' placeholder='Title....' value={headerForm.data.title} onChange={(e) => headerForm.setData("title", e.target.value)} />
            </div>
            <div className="flex flex-row items-center gap-6">
              <p className='w-[100px]'>Sub-title : </p>
              <textarea name='subtitle' className='w-96 rounded-lg h-24' placeholder='Sub-title....' value={headerForm.data.subtitle} onChange={(e) => headerForm.setData("subtitle", e.target.value)} />
            </div>
            <div className="flex flex-row items-center gap-3">
              {!loading ? (
                <button className={'px-4 py-2 bg-green-500 rounded-lg text-slate-100 border border-green-600 hover:opacity-80 duration-300 ease-out '} onClick={headSubmit}>Simpan</button>
              ) : (
                <button className='px-4 py-2 bg-green-500 rounded-lg text-slate-100 border border-green-600 hover:opacity-80 duration-300 ease-out' disabled>Loading...</button>
              )}
              {success && (<p>Success</p>)}
            </div>
          </div>
          <div className="flex flex-col gap-4 items-start px-2 w-[50%]">
            <h1 className='font-semibold text-2xl'>Logo Picture</h1>
            <img src={previewImage} alt="" className='h-80 object-contain' />
          </div>
        </div>
        <hr className='border-b border-b-black mt-2' />
      </div>
    </MainDashboardAdminTailwind>
  )
}

export default Header