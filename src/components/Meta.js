import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'All skylines parts ',
  description: 'skyline paradise sells all skylines parts from the r32 to the r35',
  keywords: 'skyline parts , skyline turbo , skyline spoiler ',
}

export default Meta
