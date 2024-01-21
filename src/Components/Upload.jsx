import React, { useState } from 'react'

const Upload = ({ setSelectedFileName, setSelectedFile }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const handleFileChange = (fileList) => {
        if (fileList.length > 0) {
            const file = fileList[0];
            console.log('Selected File:', file);
            const fileName = file.name;
            // const fileSize = file.size;
            // const fileSizeInKB = fileSize / 1024;
            // const fileSizeInMB = fileSizeInKB / 1024;
            // console.log(fileSizeInKB, "selectedFileName")
            // setSelectedFileSize(fileSize);
            setSelectedFileName(fileName);
            setSelectedFile(file);
        }
    };

    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = (e) => {
        preventDefaults(e);
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        preventDefaults(e);
        setIsDragOver(false);
    };

    const handleFileInputChange = (event) => {
        const fileList = event.target.files;
        handleFileChange(fileList);
    };

    // Handler for drop event
    const handleDrop = (e) => {
        preventDefaults(e);
        setIsDragOver(false);

        const fileList = Array.from(e.dataTransfer.files);
        handleFileChange(fileList);
    };
    return (
        <div>
            <form
                className={`form-container flex justify-center ${isDragOver ? 'border-purple-700' : ''}`}
                encType='multipart/form-data'
                onDragEnter={handleDragEnter}
                onDragOver={preventDefaults}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className=" flex flex-col items-center justify-center ps-4 pe-4 rounded-xl w-100">
                    <div className=" rounded-xl bg-white text-center p-4 w-100 shadow-md">
                        <div className='border-1 border-dashed border-gray-500 p-2.5'>
                            <img src="https://pro-manage.s3.ap-south-1.amazonaws.com/DragAndDrop.svg" alt="DragAndDrop" className='img-fluid mx-auto my-auto' />
                            <label className="label mt-3 flex gap-2 justify-center">
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileInputChange}
                                />
                                <p className="text-base text-listing font-medium cursor-pointer">Click here <span className='text-black'>to upload or drop media here</span></p>
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Upload