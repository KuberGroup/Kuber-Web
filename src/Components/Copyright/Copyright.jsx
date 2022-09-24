import React from 'react'
import { Link } from 'react-router-dom';
import { FULL_TITLE } from '../../Data/Constants';

const Copyright = () => {
    return (
        <p className='text-center' style={{
            margin: 0,
            fontFamily: 'Roboto, Helvetica, Arial,sans-serif',
            fontWeight: 400,
            fontSize: '0.875rem',
            lineHeight: 1.43,
            letterSpacing: '0.01071em',
            color: 'rgba(0, 0, 0, 0.6)',
        }}
        >
            {"Copyright © "}
            <Link style={{ color: 'inherit' }} href="https://github.com/KuberGroup" >
                {FULL_TITLE}
            </Link> {" "}
            {new Date().getFullYear()}
            {"."}
        </p>
    );

}

export default Copyright