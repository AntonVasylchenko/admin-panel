import React from "react";
import {
  typeForm,
  CollectionFormType,
  MediaData,
  PropsModal,
  ProductData,
  ServerError,
} from "./type";
import style from "./style.module.css";
import { Button, InputField, Loader, Modal } from "../../UI";
import { createClasses } from "../../utility";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useFetch } from "../../hook";
import { endPoints } from "../../constant";
import axios, {AxiosError} from "axios";
import { useStore } from "../../store";

const FormCollection: React.FC<typeForm> = ({ typeForm }) => { 
  const { changeMessage } = useStore();
  const navigate = useNavigate();
  const media = useFetch<MediaData>(endPoints.media);
  const products = useFetch<ProductData>(`${endPoints.products}/full-list`);

  const [show, setShow] = React.useState<boolean>(false);
  const [listMedia, setListMedia] = React.useState<string[]>([]);
  const [listProduct, setListProduct] = React.useState<string[]>([]);

  const [collectionForm, setCollectionForm] = React.useState<CollectionFormType>({
    title: "",
    tags: "",
    images: "",
    products: "",
  });
  if (typeForm === "change") {
    const collection = useLoaderData() as CollectionFormType;
    
    React.useEffect(() => {
      setCollectionForm( prev => ({
        ...prev,
        _id: collection._id,
        title: collection.title,
        tags: String(collection.tags)
      }));  
      
      if (collection.products.length != 0) {
        setListProduct(collection.products.toString().split(","))
      }
    }, [])
}

  const handleForm = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name || value) {
      setCollectionForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  },
    [setCollectionForm]
  );

  const handleSubmitForm = async () => {
    console.log(collectionForm);
    
    
    try {
      const path = typeForm === "create" ? endPoints.collection : `${endPoints.collection}/${collectionForm._id}`;
      const typeAxios = typeForm === "create" ? axios.post : axios.patch;
      const response = await typeAxios(path,collectionForm);
      const data = await response.data;
      changeMessage(`Collection ${data.collection.title} was ${typeForm === "create" ? "created" : "Changed"}`, "success");
      navigate("/collection/" + data.collection._id);
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
  };
  const handleShow = (): void => {
    setShow((prev) => !prev);
  };
  React.useEffect(() => {
    if (listMedia) {
      setCollectionForm((prev) => ({
        ...prev,
        media: listMedia.join(","),
      }));
    }
    if (listProduct) {
      setCollectionForm((prev) => ({
        ...prev,
        products: listProduct.join(","),
      }));
    }
  }, [listMedia, listProduct]);

  const handleOtherField = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    const typeSetState = name === "products" ? setListProduct : setListMedia;
    typeSetState((prevList) =>
      prevList.includes(value)
        ? prevList.filter((el) => el !== value)
        : [...prevList, value]
    );
  },
    [setListMedia, setListProduct]
  );
  
  if (
    media.status === "loading" ||
    media.data === null ||
    products.data === null ||
    products.status === "loading"
  ) {
    return <Loader />;
  }  
  return (
    <div className={style.collectionForm}>
      {typeForm === "create" && (
        <div className={style.formRow}>
          <Button
            typeButton="button"
            onClick={handleShow}
            cssSelector={createClasses(style.button, "primary-button")}
          >
            Add media
          </Button>
          <ModalComponent
            show={show}
            handleShow={handleShow}
            handleMedia={handleOtherField}
            data={media.data}
          />
        </div>
      )}
      <div className={style.formRow}>
        <InputField
          type="text"
          name="title"
          label="Title"
          value={collectionForm.title}
          onChange={handleForm}
        />
      </div>
      <div className={style.formRow}>
        <InputField
          type="text"
          name="tags"
          label="Tags"
          value={collectionForm.tags}
          onChange={handleForm}
        />
      </div>
      <div className={style.formRowlist}>
        <h2 className="sub-title">List of products</h2>
        {products.data.products.length !== 0 ? (
          products.data.products.map((product) => {
            return (
              <div className={style.formRowItem} key={product._id}>
                <input
                  type="checkbox"
                  name="products"
                  id={product._id}
                  value={product._id}
                  checked={collectionForm.products.includes(product._id)}
                  onChange={handleOtherField}
                />
                <label className="body-text" htmlFor={product._id}>
                  {product.title}
                </label>
              </div>
            );
          })
        ) : (
          <p className="body-text">List of products is empty</p>
        )}
      </div>
      <Button
        onClick={handleSubmitForm}
        cssSelector={createClasses("primary-button", style.formButton)}
        typeButton="button"
      >
        {typeForm === "create" ? "Create" : "Change"}
      </Button>
    </div>
  );
};

const ModalComponent: React.FC<PropsModal> = ({ show, handleShow, handleMedia, data, }) => {
  return (
    <Modal isActive={show} onClick={handleShow}>
      <div className={style.productModal}>
        <Button
          cssSelector={createClasses(
            style.modalClose,
            "outline-primary-button"
          )}
          typeButton="button"
          onClick={handleShow}
        >
          X
        </Button>
        {data.media.length == 0 ? (
          <div className={style.modalMessage}>
            <Link to="/media">
              The media list is empty. Please upload media
            </Link>
          </div>
        ) : (
          <div className={style.modalImages}>
            {data.media.map((media) => {
              return (
                <div key={media._id} className={style.modalItem}>
                  <input
                    type="checkbox"
                    name="media"
                    onChange={handleMedia}
                    id={media._id}
                    value={media._id}
                  />
                  <label htmlFor={media._id}>
                    <img src={media.path} alt={media.name} loading="lazy" />
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default FormCollection;
