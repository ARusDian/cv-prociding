import DashboardAdminLayoutCSS from "@/Layouts/DashboardAdminLayoutCSS";
import MainDashboardAdminTailwind from "@/Layouts/MainDashboardAdminTailwind";
import Jodit from "@/Components/TextEditor/Jodit";
import React, { useRef, useState, useEffect } from "react";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import "../../../../css/app.css";
import route from "ziggy-js";

const ProgramCommitte = () => {
  const editorRef = useRef();
  const [editorContent, setEditorContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const form = useForm({
    editorContent: '',
    images: [] as string[],
    redirectTo: 'proc.home'
  })

  useEffect(() => {
    form.setData('images', images)
  }, [images])


  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    form.clearErrors();
    form.post(route('proc.store'), {
      onError: (err) => console.log(err),
      onSuccess: () => console.log("success"),
    })
  };

  return (
    <div style={{ overflow: "hidden" }}>
      {/* <DashboardAdminLayoutCSS redirectTo={route("proc.home")} headerTitle="Create Program Committe" />
       */}
      <MainDashboardAdminTailwind>
        <div className="flex flex-row items-center gap-4 font-roboto">
          <InertiaLink href={route("proc.home")} className="text-xl px-3 py-1 rounded-full bg-[#77B8A3] hover:bg-[#FFA500]">{"<"}</InertiaLink>
          <h1 className="font-bold text-xl">Create Program Committe</h1>
        </div>
        <div style={{ all: "initial" }} className="prose">
          <form action={route("proc.store")} method="POST" onSubmit={submitHandler}>
            <div style={{ width: "100%", margin: "20px auto 8px auto" }}>
              <Jodit
                contentValue={form.data.editorContent}
                contentValueHandler={(value: unknown) => form.setData('editorContent', value as string)}
                imageValue={form.data.images}
                imageValueHandler={setImages}
                editorRef={editorRef}
              />
            </div>
          </form>
        </div>
        <button className="px-4 py-2 text-base rounded-full bg-[#77B8A3] hover:bg-[#FFA500]" onClick={submitHandler}>Submit</button>
        {/* <button style={{ marginTop: "12px", backgroundColor: "#FFAF50", borderWidth: 1, borderColor: "#FFA500", padding: "12px 24px", fontSize: "14px", borderRadius: "16px" }}>Submit</button> */}
      </MainDashboardAdminTailwind>
    </div>
  );
}

export default ProgramCommitte;