/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

type RemixIconProps = {
    name: string;
    className?: string;
} & React.HTMLAttributes<HTMLElement>;

const RemixIcon = ({ name, className = '', ...rest }: RemixIconProps) => {
    return <i className={`ri-${name} ${className}`} {...rest}></i>;
};

export default RemixIcon;