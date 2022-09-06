import React from 'react'
import { DropzoneArea } from "material-ui-dropzone";
import Button from '@mui/material/Button';

const DataImport = () => {

  const [files, setFiles] = React.useState('');

    const handleUpload = (files) =>{
      console.log(files);
      setFiles(files);
    }

  return (
    <div className="m-2 md:mt-0 ml-10 p-2 md:pl-10 pt-4 pb-10 pr-10 bg-white rounded-3xl" >
        <div className='mb-7 flex flex-wrap lg:flex-nowrap justify-left '>
        {/* <Header category="Home" title="Create New Model" /> */}
        <p className='mt-7 text-2xl font-extrabold tracking-tight text-slate-900'>
            Import
        </p>
        </div>

      <DropzoneArea 
        showPreviews={true}
        showPreviewsInDropzone={false}
        useChipsForPreview
        previewText="Uploaded files"
        onChange={handleUpload} 
        filesLimit={1}      
        acceptedFiles = {['text/csv']}
        
      />      
      <div className='mt-4 flex justify-end ...'>
                <Button variant="contained">
                    Contained
                </Button>
            </div>

    </div>
  )
}

export default DataImport