import React, { useRef, useState, useEffect } from "react";
import MainDashboardAdminTailwind from "@/Layouts/MainDashboardAdminTailwind";
// import DashboardAdminLayoutCSS from '@/Layouts/DashboardAdminLayoutCSS';
import Jodit from '@/Components/TextEditor/Jodit';
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import route from "ziggy-js";
interface IProgramCommitte {
  content: string,
  type: string
}

interface Props {
  id: string,
  submissionGuideline: IProgramCommitte,
}

const Edit = ({ id, submissionGuideline }: Props) => {
  const editorRef = useRef();
  const [editorContent, setEditorContent] = useState(submissionGuideline.content);
  const [images, setImages] = useState<string[]>([]);
  const form = useForm({
    editorContent: '',
    images: [] as string[]
  })

  useEffect(() => {
    form.setData('images', images)
  }, [images])


  const submitHandler = () => {
    form.clearErrors();
    form.put(route('sub.update', id), {
      onError: (err) => console.log(err),
      onSuccess: () => console.log("success"),
    })
  };

  const deleteHandler = () => {
    form.delete(route('sub.destroy', id));
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <MainDashboardAdminTailwind>
        <div className="flex flex-row items-center gap-4 font-roboto">
          <InertiaLink href={route("sub.home")} className="text-xl px-3 py-1 rounded-full bg-[#77B8A3] hover:bg-[#FFA500]">{"<"}</InertiaLink>
          <h1 className="font-bold text-xl">Edit Submission Guideline</h1>
        </div>
        <div style={{ all: "initial" }} className="prose">
          <div style={{ width: "100%", margin: "20px auto 8px" }}>
            <Jodit
              contentValue={editorContent}
              contentValueHandler={(value: unknown) => form.setData('editorContent', value as string)}
              imageValue={form.data.images}
              imageValueHandler={setImages}
              editorRef={editorRef}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <button className="px-4 py-2 text-base rounded-full bg-[#77B8A3] font-semibold hover:bg-[#FFA500]" onClick={submitHandler}>Save</button>
          <button className="px-4 py-2 text-base rounded-full bg-red-500 text-white font-semibold hover:bg-red-600" onClick={deleteHandler}>Delete</button>
        </div>
      </MainDashboardAdminTailwind>
    </div>
  );
}

export default Edit;