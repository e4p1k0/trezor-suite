import React from 'react';
import styled from 'styled-components';
import { resolveStaticPath } from '@trezor/utils';
import { PngImage, SvgImage, PNG_IMAGES, SVG_IMAGES } from './images';

const PNG_PATH = 'images/png';
const SVG_PATH = 'images/svg';

const StyledImage = styled.img`
    /* should not overflow it's container */
    max-width: 100%;
    filter: ${({ theme }) => theme.IMAGE_FILTER};
`;

const buildSrcSet = <
    BasePath extends string,
    ImageObject extends typeof PNG_IMAGES | typeof SVG_IMAGES,
    ImageKey extends keyof ImageObject,
>(
    basePath: BasePath,
    imageObject: ImageObject,
    imageKey: ImageKey,
) => {
    const imageFile1x = imageObject[imageKey];
    const hiRes = `${imageKey}_2x`;
    const imageFile2x = hiRes in imageObject ? imageObject[hiRes as ImageKey] : undefined;

    if (!imageFile2x) {
        return undefined;
    }

    return `${resolveStaticPath(`${basePath}/${imageFile1x}`)} 1x, ${resolveStaticPath(
        `${basePath}/${imageFile2x}`,
    )} 2x`;
};

export type ImageType = PngImage | SvgImage;

export type ImageProps = React.ImgHTMLAttributes<Omit<HTMLImageElement, 'src'>> & {
    image: ImageType;
};

const isPNG = (image: ImageType): image is PngImage => image in PNG_IMAGES;
const isSVG = (image: ImageType): image is SvgImage => image in SVG_IMAGES;

export const Image = ({ image, ...props }: ImageProps) => {
    if (isPNG(image)) {
        return (
            <StyledImage
                src={resolveStaticPath(`${PNG_PATH}/${PNG_IMAGES[image]}`)}
                srcSet={buildSrcSet(PNG_PATH, PNG_IMAGES, image)}
                {...props}
            />
        );
    }

    if (isSVG(image)) {
        return (
            <StyledImage
                src={resolveStaticPath(`${SVG_PATH}/${SVG_IMAGES[image]}`)}
                srcSet={buildSrcSet(SVG_PATH, SVG_IMAGES, image)}
                {...props}
            />
        );
    }

    return null;
};
