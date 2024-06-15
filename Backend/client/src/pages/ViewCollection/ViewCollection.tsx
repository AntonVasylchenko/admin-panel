import React from 'react'
import { ServerError,CollectionData } from "./type"
import style from "./style.module.css"
import { Button, Loader } from '../../UI'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createClasses } from '../../utility'
import { useStore } from '../../store'
import { useFetch } from '../../hook'
import { endPoints } from '../../constant'
import axios, { AxiosError } from 'axios'

const ViewCollection:React.FC = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();

  const path = `${endPoints.collection}/${collectionId}`
  const { status, data } = useFetch<CollectionData>(path);
  const { changeMessage } = useStore();

  if (status == "loading" || data === null) {
    return <Loader />
  }
  const { collection } = data;

  const handleRemove = async (): Promise<void> => {
    try {
      const response = await axios.delete(path);
      const data = await response.data;
      changeMessage(data.msg, "success");
      navigate("/collection");
    } catch (error) {
      let messageError = "Error";
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError.response?.data.msg) {
          const { msg } = serverError.response?.data;
          messageError = msg;
        }
      }
      changeMessage(messageError, "error");
    }
  }
  
  return (
    <div className={style.collection}>
    <div className={style.controller}>
      <Button onClick={handleRemove} typeButton='button' cssSelector={createClasses(style.buttonRemove, "cancel-button")}>Remove </Button>
      <Link className={style.linkEdit} to="edit">Edit</Link>
    </div>
    {collection.images.length !== 0
      &&
      <div className={style.media}>
        <img src={collection.images[0]} alt="Image" loading='lazy' />
      </div>
    }
    <div className={style.info}>
      <h2 className={createClasses(style.productTitle, "main-title")}>
        {collection.title}
      </h2>
      <p className={createClasses(style.productTags, "body-text")}>
        {collection.tags
          .filter(tag => tag !== "")
          .map(tag => {
            return (
              <span className='small-text' key={"tag" + tag}>{tag}</span>
            )
          })}
      </p>
    </div>
  </div>
  )
}

export default ViewCollection