import React from 'react';

// Import SVG files
import LogoSvg from "/icons/icon-logo.svg";
import SearchSvg from "/icons/icon-search.svg";
import ArroqSvg from "/icons/icon-arrow.svg";
import ProductSvg from "/icons/icon-product.svg";
import MediaSvg from "/icons/icon-media.svg";
import UploadSvg from "/icons/icon-upload.svg";

const Icon: React.FC<{ type: string, selectorClass?: string }> = React.memo(({ type, selectorClass }) => {
    const getSvg = () => {
        switch (type.toLowerCase().trim()) {
            case "logo":
                return <img src={LogoSvg} alt={type} className={selectorClass} loading='lazy' />;
            case "search":
                return <img src={SearchSvg} alt={type} className={selectorClass} loading='lazy' />;
            case "arrow":
                return <img src={ArroqSvg} alt={type} className={selectorClass} loading='lazy' />;
            case "product":
                return <img src={ProductSvg} alt={type} className={selectorClass} loading='lazy' />;
            case "media":
                return <img src={MediaSvg} alt={type} className={selectorClass} loading='lazy' />;
            case "upload":
                return <img src={UploadSvg} alt={type} className={selectorClass} loading='lazy' />;
            default:
                return null;
        }
    };

    return (
        <>
            {getSvg()}
        </>
    );
}, (prev, next) => prev.type === next.type);

export default Icon;
