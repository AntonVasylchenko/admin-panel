import React from 'react';
import style from './style.module.css';
import { CustomError } from "./type";

import { endPoints } from '../../constant';
import { InputField, Button } from '../../UI';
import { useSubmit } from 'react-router-dom';
import { createClasses } from '../../utility';
import { useStore } from '../../store';

const AddMedia: React.FC = () => {
  const submit = useSubmit();
  const [media, setMedia] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const { changeMessage } = useStore();

  const handlePreviewImage = (): void => {
    if (!media) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (result) {
        setPreview(result);
      }
    };
    reader.onerror = () => {
      console.error("Error reading file");
    };
    reader.readAsDataURL(media);
  };

  React.useEffect(() => {
    handlePreviewImage();
  }, [media]);

  const handleFile = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      setMedia(file);
    }
  }, []);

  const createFormData = (media: File): FormData => {
    const formData = new FormData();
    formData.append('file', media);
    return formData;
  };

  const handleAddMedia = async (): Promise<void> => {
    if (!media) {
      throw new Error("Please provide media");
    }

    const formData = createFormData(media);
    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    try {
      const response = await fetch(endPoints.media, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || "error")
      }
      setMedia(null);
      setPreview(null);
      changeMessage("Media added", "success");
      submit({}, { method: "post" });
    } catch (error) {
      const errorMessage = (error as CustomError).message ?? "Error";
      changeMessage(errorMessage, "error");
    }
  };

  return (
    <div className={style.media}>
      <div className={style.controller}>
        <InputField type='file' name='file' label='Media' onChange={handleFile} />
      </div>
      {preview &&
        <div className={style.preview}>
          <div className={style.preview_wrapper}>
            <h2 className={createClasses(style.preview_title, "sub-title")}>Preview image</h2>
            <img
              className={style.preview_image}
              src={preview}
              alt="Preview"
              loading='lazy'
            />
          </div>
          <Button
            onClick={handleAddMedia}
            typeButton='button'
            cssSelector={createClasses('outline-primary-button', style.preview_button)}
          >
            Add media
          </Button>
        </div>
      }
    </div>
  );
};

export default AddMedia;