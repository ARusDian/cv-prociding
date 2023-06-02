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
    input_background_image: header?.background_image_path || '',
  });
  const [logoPreviewImage, setLogoPreviewImage] = React.useState<string | undefined>(headerForm.data.logo_path);
  const [backgroundPreviewImage, setBackgroundPreviewImage] = React.useState<string | undefined>(headerForm.data.background_image_path);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string[]>([]);

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
        onError: (errors) => {
          setLoading(false);
          const listError: string[] = [];
          for (const property in errors) {
            listError.push(errors[property]);
          }
          setError(listError);
        },
      });
    } else {
      // @ts-ignore
      headerForm.data._method = 'PUT';
      headerForm.post(route('home.header.update', header.id), {
        onStart: () => setLoading(true),
        onSuccess: () => {
          setLoading(false);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
        },
        onError: (errors) => {
          setLoading(false);
          const listError: string[] = [];
          for (const property in errors) {
            listError.push(errors[property]);
          }
          setError(listError);
        },
      })
    }
  }

  console.log(error);

  const backgroundInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundPreviewImage(URL.createObjectURL(e.target?.files![0]));
    headerForm.setData("input_background_image", e.target?.files![0]);
  }

  const logoInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoPreviewImage(URL.createObjectURL(e.target?.files![0]));
    headerForm.setData("input_logo_path", e.target?.files![0]);
  }

  return (
    <MainDashboardAdminTailwind>
      <div className="overflow-hidden font-roboto flex flex-col gap-4 mt-4 px-2">
        <div className="flex flex-row gap-4">
          <h1 className='font-semibold text-2xl'>Header</h1>
          <div className="flex flex-row flex-wrap text-sm gap-1 w-[50%]">
            {error.length > 0 && error.map((err) => (
              <p className='text-red-500 mr-2'>*{err}</p>
            ))}
          </div>
        </div>
        <hr className='border-b border-b-black' />
        <div className="flex flex-col w-full justify-between gap-2 px-2">
          <div className="flex flex-row items-center gap-6">
            <p className='w-[100px]'>Background Image</p>
            <input type="file" name="background_image" className="rounded-lg w-96 border border-green-900 file:bg-green-500 file:py-2 file:px-4 file:mr-4 file:border-none file:hover:cursor-pointer file:placeholder:" accept='.jpg, .jpeg, .png' onChange={backgroundInputHandler} />
          </div>
          <div className="flex flex-row items-center gap-6">
            {backgroundPreviewImage && <img src={backgroundPreviewImage} alt="" className='h-80 object-contain' />}
          </div>
        </div>
        <hr className='border-b border-b-black' />
        <div id='head-content' className="flex flex-row">
          <div className="flex flex-col gap-4 items-start px-2 w-[50%]">
            <div className="flex flex-row items-center gap-6">
              <p className='w-[100px]'>Logo : </p>
              <input type="file" name='logo_path' className="rounded-lg w-96 border border-green-900 file:bg-green-500 file:py-2 file:px-4 file:mr-4 file:border-none file:hover:cursor-pointer file:placeholder:" accept='.jpg, .jpeg, .png' onChange={logoInputHandler} />
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
            <img src={logoPreviewImage} alt="" className='h-80 object-contain' />
          </div>
        </div>
        <hr className='border-b border-b-black mt-2' />
      </div>
    </MainDashboardAdminTailwind>
  )
}

export default Header