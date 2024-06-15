import React from 'react'
import { ServerError, CollectionData, ProductsData } from "./type"
import style from "./style.module.css"
import { Button, Loader } from '../../UI'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createClasses } from '../../utility'
import { useStore } from '../../store'
import { useFetch } from '../../hook'
import { endPoints } from '../../constant'
import axios, { AxiosError } from 'axios'
import { ProductItem } from '../../component'

const ViewCollection: React.FC = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = React.useState<ProductsData | null>(null);
  const path = `${endPoints.collection}/${collectionId}`;
  const { status, data: responseData } = useFetch<CollectionData>(path);

  const { changeMessage } = useStore();

  const handleProductList = async () => {
    if (!responseData || responseData.collection.products.length === 0) return;
    try {
      const response = await axios.get(`${endPoints.collection}/list`, {
        params: {
          listId: responseData.collection.products.toString()
        }
      });
      const data = await response.data;
      setProducts(data);
    } catch (error) {
      console.error('There was an error making the request:', error);
    }
  };


  React.useEffect(() => {
    if (responseData) {
      handleProductList()
    }
  }, [responseData])

  if (status == "loading" || responseData === null) {
    return <Loader />
  }

  const { collection } = responseData

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
        {
          products &&
          products.products.map(product => {
            return (
              <ProductItem
                key={product._id}
                _id={product._id}
                images={product.images}
                title={product.title}
                price={product.price}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default ViewCollection