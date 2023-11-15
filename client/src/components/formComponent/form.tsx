import React, { useState } from 'react';

//axios
import { apiClientMulti } from '@/lib/apiClient';

const Form = () => {
    const [selectImage, setSelectImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList !== null) {
            const file = fileList[0];
            setSelectImage(file);
        };
    };

    const handleUpload = async () => {

        if (!selectImage) {
            console.error('No image selected');
            return;
        };

        const formData = new FormData();
        formData.append('image', selectImage);
        formData.append('userId', '1');

        try {
            const response = await apiClientMulti.post('/upload/upload', formData);
            console.log(response.data.message);

            setSelectImage(null);
            location.reload();

        } catch (err) {
            console.error(err);
        };
    };

    return (
    <section className="flex items-center justify-center pt-6 mb-8">
        {
            selectImage ? (
                <div className='flex items-center'>
                    <p className='mr-6'>
                        {selectImage.name}
                    </p>
                    <button 
                    className='cursor-pointer bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400'
                    onClick={handleUpload}
                    >
                        アップロード
                    </button>
                </div>
            ) : (
                <>                
                <label className="cursor-pointer bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400 transition-all">
                    <span>ファイルを選択</span>
                    <input id="inputImage" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
                </>
            )
        }
    </section>
    );
};

export default Form;