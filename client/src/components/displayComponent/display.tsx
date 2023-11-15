import React, { useState, useEffect } from 'react';

//axios
import { apiClientMulti } from '@/lib/apiClient';

//type
type ImageType = {
    key: string | undefined;
    url: string;
    lastModified: Date | undefined;
    size: number | undefined;
};

const Display = () => {
    const [images, setImages] = useState<ImageType[]>([]);

    const fetchImages = async () => {
        const response = await apiClientMulti.get("/download/list-images");

        try {
            if (response.data.images) {
                setImages(response.data.images);
            } else {
                console.log("データなし");
            };
        } catch (err) {
            console.error(err);
        };
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <section>
            <ul className='flex flex-wrap'>
                {
                    images.map((image) => (
                        <li key={image.key} className='p-2 w-64 cursor-pointer h-40 hover:scale-105 transition-all'>
                            <img 
                            className='m-auto w-full h-full rounded-md'
                            alt='画像'
                            src={image.url}
                            />
                        </li>
                    ))
                }
            </ul>
        </section>
    );
};

export default Display;