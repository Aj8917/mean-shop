import { title } from 'process';
import React from 'react'
import { Helmet } from 'react-helmet-async'
const Meta = ({title , description ,keywords}) => {
  return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keywords' content={keywords} />
        </Helmet>
  )
};

Meta.defaultProps={
    title: 'Welcome To MeRnShop',
    description:'Find The best Deals Online !',
    keywords:'electronics, buy electronics , cheap electronics',

};

export default Meta