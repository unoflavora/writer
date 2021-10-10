import { Editor } from '@tinymce/tinymce-react';

export default function EditorJS(props) {
  return (
    <Editor 
      {...props}
      apiKey='wq1y26f7fjwtm2n5ovqw4c2egh0tl1bend35s56qt33anui5'
      init={{
        directionality : "ltr",
        height: 350,
        menubar: 'insert | format',
        plugins: [
          'tinydrive advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'image code'
        ],
        toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | insertfile   | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | bullist numlist  | ' +
        'removeformat | help code',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        external_plugins: {
          'tiny_mce_wiris': 'https://cdn.jsdelivr.net/npm/@wiris/mathtype-tinymce4@7.27.0/plugin.min.js'
        },
        tinydrive_token_provider: '/api/jwt',
      }}
      
    />
  )
}