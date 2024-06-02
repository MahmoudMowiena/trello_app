import { supabase } from '@/lib/supabase';
import React, { useState } from 'react';

interface ImageUploadProps {
    imageFileName?: string;
    cardId: string;
    onFileNameChange: (fileName: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ cardId, imageFileName, onFileNameChange }) => {
  const [selectedImage, setSelectedImage] = useState(imageFileName);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: any = "";

    if (e.target.files) {
      file = e.target.files[0];
    }

    const { data, error } = await supabase.storage.from("cardsImages").upload(cardId+file.name, file as File);

    if (data) {
      setSelectedImage(file.name);
      onFileNameChange(file.name)
    } else {
      console.log(error)
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label className="cursor-pointer">
        {selectedImage ? (
          <img src={`https://lqdmizxmdgfywuxmjqjm.supabase.co/storage/v1/object/public/cardsImages/${cardId + selectedImage}`} alt="Selected" className="hover:opacity-75" />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center bg-gray-200 hover:opacity-75">
            Click to upload an image
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ImageUpload;
