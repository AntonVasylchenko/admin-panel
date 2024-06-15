import React from 'react'
import { CollectionData } from "./type"
import style from "./style.module.css"

import { Link } from 'react-router-dom'
import { createClasses } from '../../utility'
import { endPoints } from '../../constant'
import { useFetch } from '../../hook'
import { IconList, Loader } from '../../UI'

const Collections: React.FC = () => {
  const { status, data } = useFetch<CollectionData>(endPoints.collection);

  if (status == "loading" || data === null) {
    return <Loader />
  }


  return (
    <div className={style.collections}>
      <div className={style.container}>
        <div className={style.contoller}>
          <Link
            className={createClasses(style.button, 'primary-button')}
            to="create"
          >
            Create new collection
          </Link>
        </div>
        {data.collections.length !== 0 &&
          <div className={style.list}>
            {data.collections.map(collection => {
              return (
                <div key={collection._id}>
                  <Link to={collection._id} className={style.collection}>
                    <div className={style.wrapper}>
                      <div className={style.image}>
                        {
                          collection.images.length
                            ? <img src={collection.images[0]} alt={collection.title} loading='lazy' />
                            : <IconList type='media' />
                        }
                      </div>
                      <div className={style.info}>
                        <h2 className='sub-title'>{collection.title}</h2>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        }
        {data.collections.length === 0 &&
          <div className={style.notFound}>
            <h2 className='main-title'>Not found</h2>
          </div>
        }
      </div>
    </div>
  )
}

export default Collections