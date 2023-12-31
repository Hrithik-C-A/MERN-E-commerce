import React from 'react'
import { Helmet } from 'react-helmet-async'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={ description } />
        <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'E-commerce App',
    description: 'Best products, lowest prices.',
    keywords: 'electronics, buy electronics, cheap electronics'
};

export default Meta