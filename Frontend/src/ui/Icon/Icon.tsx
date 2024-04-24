import React from 'react'
import LogoSvg from "/icons/icon-logo.svg"
import SearchSvg from "/icons/icon-search.svg"
import ArroqSvg from "/icons/icon-arrow.svg"
import ProductSvg from "/icons/icon-product.svg"
import MediaSvg from "/icons/icon-media.svg"

const Icon: React.FC<{ type: string, selectorClass?: string }> = React.memo(
    ({ type,selectorClass }) => {

        function svgLogo() {
            return (
                <img src={LogoSvg} alt={type}
                className={selectorClass} loading='lazy' />
            )
        }

        function svgSearch() {
            return (
                <img src={SearchSvg} alt={type} 
                className={selectorClass} loading='lazy' />
            )
        }
        function svgArrow() {
            return (
                <img src={ArroqSvg} alt={type} 
                className={selectorClass} loading='lazy' />
            )
        }
        function svgProduct() {
            return (
                <img src={ProductSvg} alt={type} 
                className={selectorClass} loading='lazy' />
            )
        }
        function svgMedia() {
            return (
                <img src={MediaSvg} alt={type} 
                className={selectorClass} loading='lazy' />
            )
        }

        let icon;
        switch (type.toLocaleLowerCase().trim()) {
            case "logo":
                icon = svgLogo()
                break;
            case "search":
                icon = svgSearch()
                break;
            case "arrow":
                icon = svgArrow()
                break;
            case "product":
                icon = svgProduct()
                break;
            case "media":
                icon = svgMedia()
                break;
            default:
                break;
        }

        return (
            <>
                {
                    icon && icon
                }
            </>
        )
    },
    (prev, next) => {
        if (prev.type === next.type) {
            return true;
        } else {
            return false;
        }
    }
)

export default Icon