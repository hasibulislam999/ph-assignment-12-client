import React from 'react';
import { Helmet } from 'react-helmet-async';

const Title = ({ title }) => {
    return (
        <div>
            <Helmet>
                <title>
                    {title} - Hammer Power
                </title>
            </Helmet>
        </div>
    );
};

export default Title;