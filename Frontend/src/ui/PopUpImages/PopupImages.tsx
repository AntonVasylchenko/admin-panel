import React from 'react'

type Props = {
    images: {
        _id: string,
        path: string
    }[]
}
const PopupImages: React.FC<Props> = ({ images }) => {
    return (
        <div className='container'>
            <div className='content'>
                {
                    images.map( img => {
                        return (
                            <div key={img.path}>
                                <img src={img.path} width={100} height={100} alt="" loading='lazy' />
                            </div>
                        )
                    })
                }
            </div>
            <div className='overlay'>3</div>
        </div>
    )
}

export default PopupImages