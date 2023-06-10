import React, { useState } from 'react'
import MainDashboardAdminTailwind from '@/Layouts/MainDashboardAdminTailwind'
import { IHomeNews, IHomeNewsForm } from '@/Models/Home';
import { useForm } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import MaterialReactTable from "material-react-table";
import { Dialog, DialogContent } from "@mui/material";

interface Props {
  news: IHomeNews[]
}

const News = ({ news }: Props) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [createOpenToggle, setCreateOpenToggle] = useState<boolean>(false);
  const [editOpenToggle, setEditOpenToggle] = useState<boolean>(false);
  const [deleteOpenToggle, setDeleteOpenToggle] = useState<boolean>(false);
  const [currentEditedId, setCurrentEditedId] = useState<number | undefined>(undefined);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const newsForm = useForm<IHomeNewsForm>({
    title: "",
    content: "",
    img: ""
  });
  const editNewsForm = useForm<IHomeNewsForm>({
    title: "",
    content: "",
    img: ""
  });
  const activeToggleForm = useForm();

  const data = [...news];

  const onSubmitHandler = () => {
    setCreateOpenToggle(prev => !prev);
    newsForm.post(route('home.news.store'), {
      onProgress: () => setLoading(true),
      onSuccess: () => {
        setLoading(false)
        // window.location.reload()
      },
      onError: (errors) => {
        setLoading(false)
        setError(errors.message)
        console.log(errors)
      }
    })
  }

  const onEditHandler = (id: number) => {
    setEditOpenToggle(prev => !prev);
    //@ts-ignore
    editNewsForm.data._method = 'PUT';
    editNewsForm.post(route('home.news.update', id), {
      onProgress: () => setLoading(true),
      onSuccess: () => {
        setLoading(false);
        // window.location.reload()
      },
      onError: (errors) => {
        setLoading(false)
        setError(errors.message)
        console.log(errors);
      }
    })
  }

  const onDeleteHandler = (id: number) => {
    setDeleteOpenToggle(prev => !prev);
    newsForm.delete(route('home.news.destroy', id), {
      onProgress: () => setLoading(true),
      onSuccess: () => {
        setLoading(false);
        // window.location.reload()
      },
      onError: (errors) => {
        setLoading(false)
        setError(errors.message)
      }
    })
  }

  const onActiveToggleHandler = (id: number) => {
    activeToggleForm.put(route('home.news.toggle_active', id), {
      onProgress: () => setLoading(true),
      onSuccess: () => {
        setLoading(false);
        // window.location.reload()
      },
      onError: (errors) => {
        setLoading(false)
        setError(errors.message)
      }
    })
  }

  return (
    <MainDashboardAdminTailwind>
      <Dialog open={createOpenToggle} onClose={() => setCreateOpenToggle(prev => !prev)} maxWidth='lg'>
        <DialogContent className='w-[1000px] h-[900px] max-w-6xl'>
          <div className="flex flex-col justify-start gap-5 h-full">
            <div className="flex flex-row justify-between">
              <h1 className='text-2xl font-bold'>Add News</h1>
              <button className='px-4 py-2 bg-green-500 rounded-lg font-bold text-white hover:bg-green-600' onClick={onSubmitHandler}>Submit</button>
            </div>
            <div className="flex flex-col gap-2">
              <p className='font-semibold'>Title</p>
              <input type="text" name="title" id="" className='w-full rounded-lg text-lg' value={newsForm.data.title} onChange={(e) => newsForm.setData('title', e.target.value)}/>
            </div>
            <div className="flex flex-col gap-2">
              <p className='font-semibold'>Content</p>
              <textarea name="content" className='w-full rounded-lg text-lg h-32 resize-none'value={newsForm.data.content} onChange={(e) => newsForm.setData('content', e.target.value)} />
            </div>
            <div className="flex flex-row items-center justify-between gap-6">
              <input type="file" name='img' className="rounded-lg w-full border border-green-900 file:bg-green-500 file:py-2 file:px-4 file:mr-4 file:border-none file:hover:cursor-pointer file:placeholder:" accept='.jpg, .jpeg, .png' onChange={(e) => {
                newsForm.setData("img", e.target.files![0]);
                setPreview(URL.createObjectURL(e.target.files![0]));
              }} />
            </div>
            <div className="h-[450px] w-full border border-green-200">
              {newsForm.data.img ?
                (
                  <img src={preview} alt="" className='object-contain h-full w-full' />
                ) : (
                  <div className="flex flex-col justify-center items-center h-full">
                    <p>Image will be shown here...</p>
                  </div>
                )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={editOpenToggle} onClose={() => setEditOpenToggle(prev => !prev)} maxWidth='lg'>
        <DialogContent className='w-[1000px] h-[900px] max-w-6xl'>
          <div className="flex flex-col justify-start gap-5 h-full">
            <div className="flex flex-row justify-between">
              <h1 className='text-2xl font-bold'>Edit News</h1>
              <button className='px-4 py-2 bg-green-500 rounded-lg font-bold text-white hover:bg-green-600' onClick={() => onEditHandler(currentEditedId!)}>Submit</button>
            </div>
            <div className="flex flex-col gap-2">
              <p className='font-semibold'>Title</p>
              <input type="text" name="title" id="" className='w-full rounded-lg text-lg' value={editNewsForm.data.title} onChange={(e) => editNewsForm.setData('title', e.target.value)}/>
            </div>
            <div className="flex flex-col gap-2">
              <p className='font-semibold'>Content</p>
              <textarea name="content" className='w-full rounded-lg text-lg h-32 resize-none'value={editNewsForm.data.content} onChange={(e) => editNewsForm.setData('content', e.target.value)} />
            </div>
            <div className="flex flex-row items-center justify-between gap-6">
              <input type="file" name='img' className="rounded-lg w-full border border-green-900 file:bg-green-500 file:py-2 file:px-4 file:mr-4 file:border-none file:hover:cursor-pointer file:placeholder:" accept='.jpg, .jpeg, .png' onChange={(e) => {
                editNewsForm.setData("img", e.target.files![0]);
                setPreview(URL.createObjectURL(e.target.files![0]));
              }} />
            </div>
            <div className="h-[450px] w-full border border-green-200">
              {editNewsForm.data.img ?
                (
                  <img src={preview} alt="" className='object-contain h-full w-full' />
                ) : (
                  <div className="flex flex-col justify-center items-center h-full">
                    <p>Image will be shown here...</p>
                  </div>
                )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpenToggle} onClose={() => {
        setDeleteOpenToggle(prev => !prev)
        setCurrentEditedId(undefined)
      }}>
        <DialogContent className='w-[400px] h-[200px] flex flex-col justify-center items-center gap-4'>
          <h1 className='text-2xl font-bold text-center'>Are you sure want to delete this data?</h1>
          <div className="flex flex-row justify-center items-center w-full gap-4">
            <button className='px-4 py-2 w-[25%] bg-green-500 rounded-lg font-bold text-white hover:bg-green-600' onClick={() => onDeleteHandler(currentEditedId!)} >Yes</button>
            <button className='px-4 py-2 w-[25%] bg-red-500 rounded-lg font-bold text-white hover:bg-red-600' onClick={() => {
              setDeleteOpenToggle(prev => !prev)
              setCurrentEditedId(undefined)
            }} >No</button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="overflow-hidden font-roboto flex flex-col gap-4 mt-4 px-2">
        <div className="flex flex-row justify-between gap-4">
          <div className="flex flex-row gap-4 items-center">
            <h1 className="text-3xl font-bold ">News</h1>
            {loading && (
              <div role="status">
                <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
          <div className='flex flex-row gap-4'>
            <button className='px-4 py-2 bg-green-500 rounded-lg font-bold text-white' onClick={() => setCreateOpenToggle(prev => !prev)} >Add News</button>
          </div>
        </div>
      </div>
      <hr className='border-b border-b-black mb-2 mt-1' />
      <MaterialReactTable
        columns={[
          {
            accessorKey: 'title',
            header: 'Title',
          },
          {
            accessorKey: 'content',
            header: 'Content',
          },
          {
            accessorKey: 'image',
            header: 'Image',
          },
          {
            accessorFn: (row) => {
              return row.is_active ? 'Active' : 'Inactive'
            },
            header: 'Active',
          }
        ]}
        data={data}
        enableColumnFilters
        enableRowActions
        enablePagination
        enableSorting
        enableBottomToolbar
        enableTopToolbar
        enableRowNumbers
        positionActionsColumn='last'
        renderRowActions={({ row }) => (
          <div className="flex flex-row gap-2">
            <button onClick={() => {
              onActiveToggleHandler(row.original.id);
            }}
              className={row.original.is_active ? "bg-green-500 text-center w-24 text-white hover:bg-green-600 py-3 px-5 rounded-lg text-md font-semibold" : "bg-red-500 text-white hover:bg-red-600 py-3 px-5 text-center w-24 rounded-lg text-md font-semibold"} >
              {row.original.is_active ? "Inactive" : "Active"}
            </button>
            <a target='_blank' href={row.original.image}
              className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
              Image
            </a>
            <button onClick={() => {
              setCurrentEditedId(row.original.id)
              setEditOpenToggle(prev => !prev)
            }}
              className="bg-yellow-500 text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold">
              Edit
            </button>
            <button onClick={() => {
              setDeleteOpenToggle(prev => !prev)
              setCurrentEditedId(row.original.id)
            }}
              className="bg-red-500 text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold">
              Delete
            </button>
          </div>
        )}
      />
    </MainDashboardAdminTailwind >
  )
}

export default News