import {Fragment} from 'react'
import Header from './Header'
import Head from 'next/head'
import Script from 'next/script'

const Layout = (props) => {

  return(
    <Fragment>
      <Head>
        <title>Product Hunt</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      </Head>
      <Header/>
      <main className="p-5">
        {props.children}
      </main>
      <Script
        src="https://kit.fontawesome.com/e323a62359.js"
      />
    </Fragment>
  )

}

export default Layout
