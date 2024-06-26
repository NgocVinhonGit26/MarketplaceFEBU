import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "./UploadAdapter";
import "./style.css";

function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new UploadAdapter(loader);
  };
}

const TextEditor = ({ information, setInformation }) => {
  const editorConfiguration = {
    toolbar: [
      "heading",
      "|",
      "fontColor",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "imageUpload",
    ],
    extraPlugins: [CustomUploadAdapterPlugin],
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={information}
      config={editorConfiguration}
      onReady={(editor) => {
        // Khi CKEditor sẵn sàng
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setInformation(data);
      }}
      onBlur={(event, editor) => {
        // Khi CKEditor bị mất focus
      }}
      onFocus={(event, editor) => {
        // Khi CKEditor nhận được focus
      }}
    />
  );
};

export default TextEditor;
