import DashboardAdminLayoutCSS from "@/Layouts/DashboardAdminLayoutCSS";
import Jodit from "@/Components/TextEditor/Jodit";
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import route from "ziggy-js";

const ProgramCommitte = () => {
  const editorRef = useRef();
  const [editorContent, setEditorContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const form = useForm({
    editorContent: '',
    images: [] as string[]
  })

  useEffect(() => {
    form.setData('images', images)
  }, [images])


  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    form.clearErrors();
    form.post(route('proc.post'), {
      onError: (err) => console.log(err),
      onSuccess: () => console.log("success"),
    })
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <DashboardAdminLayoutCSS redirectTo={route("proc.home")} headerTitle="Create Program Committe"/>
      <div style={{ all: "initial" }}></div>
      <form action={route("proc.post")} method="POST" onSubmit={submitHandler}>
        <div style={{ width: "80%", margin: "32px auto" }}>
          <Jodit
            contentValue={form.data.editorContent}
            contentValueHandler={(value: unknown) => form.setData('editorContent', value as string)}
            imageValue={form.data.images}
            imageValueHandler={setImages}
            editorRef={editorRef}
          />

          <button style={{ marginTop: "12px", backgroundColor: "#FFAF50", borderWidth: 1, borderColor: "#FFA500", padding: "12px 24px", fontSize: "14px", borderRadius: "16px" }}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ProgramCommitte;