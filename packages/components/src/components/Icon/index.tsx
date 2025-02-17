import styled, { keyframes, css } from 'styled-components';

import React from 'react';
import { ReactSVG } from 'react-svg';
import { IconType } from '../../support/types';
import { useTheme } from '../../utils';
import { ICONS } from './icons';

// TODO: make animation of icons better
const rotate180up = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(180deg);
    }
`;

const rotate180down = keyframes`
    from {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(0deg);
    }
`;

const chooseIconAnimationType = (canAnimate?: boolean, isActive?: boolean) => {
    if (canAnimate) {
        if (isActive) {
            return rotate180up;
        }
        return rotate180down;
    }
    return null;
};

const SvgWrapper = styled.div<{
    $canAnimate: WrapperProps['canAnimate'];
    $color: WrapperProps['color'];
    $isActive: WrapperProps['isActive'];
    $isHollow: WrapperProps['isHollow'];
    $hoverColor: WrapperProps['hoverColor'];
    $size: WrapperProps['size'];
    $useCursorPointer: WrapperProps['useCursorPointer'];
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${({ $size }) => $size}px;
    width: ${({ $size }) => $size}px;
    animation: ${({ $canAnimate, $isActive }) => chooseIconAnimationType($canAnimate, $isActive)}
        0.2s linear 1 forwards;

    div {
        display: flex;
        height: ${({ $size }) => $size}px;
        line-height: ${({ $size }) => $size}px;
        align-items: center;
        justify-content: center;
    }

    span {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    path {
        stroke: ${({ $color, $isHollow }) => $isHollow && $color};
        fill: ${({ $color, $isHollow }) => !$isHollow && $color};
    }

    :hover {
        path {
            fill: ${({ $hoverColor }) => $hoverColor};
        }
    }

    ${({ $useCursorPointer }) =>
        $useCursorPointer &&
        css`
            cursor: pointer;
        `}
`;

type WrapperProps = Omit<IconProps, 'icon'>;
export interface IconProps extends React.SVGAttributes<HTMLDivElement> {
    className?: string;
    icon: IconType;
    size?: number;
    color?: string;
    isHollow?: boolean;
    isActive?: boolean;
    canAnimate?: boolean;
    hoverColor?: string;
    useCursorPointer?: boolean;
    'data-test'?: string;
}

export const Icon = React.forwardRef(
    (
        {
            icon,
            size = 24,
            color,
            isHollow,
            isActive,
            canAnimate,
            hoverColor,
            useCursorPointer,
            className,
            onClick,
            onMouseEnter,
            onMouseLeave,
            onFocus,
            'data-test': dataTest,
        }: IconProps,
        ref?: React.Ref<HTMLDivElement>,
    ) => {
        const theme = useTheme();
        const defaultColor = color ?? theme.TYPE_LIGHT_GREY;
        return (
            <SvgWrapper
                className={className}
                $canAnimate={canAnimate}
                $hoverColor={hoverColor}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onFocus={onFocus}
                $isActive={isActive}
                $size={size}
                $isHollow={isHollow}
                ref={ref}
                $useCursorPointer={onClick !== undefined || useCursorPointer}
                $color={defaultColor}
                data-test={dataTest}
            >
                <ReactSVG
                    src={ICONS[icon]}
                    beforeInjection={svg => {
                        svg.setAttribute('width', `${size}px`);
                        svg.setAttribute('height', `${size}px`);
                        // svg.setAttribute('fill', defaultColor);
                    }}
                    loading={() => <span className="loading" />}
                />
            </SvgWrapper>
        );
    },
);
