import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import '@wordpress/block-library/build-style/style.css'
import '../styles/layout.css'
import bio from "../images/bio.jpg";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        generalSettings {
          title
          url
        }
        menu(id: "TWVudToy") {
          menuItems {
            nodes {
              url
              label
              id
            }
          }
        }
      }
    }
  `);

  const { title, url } = data.wpgraphql.generalSettings
  const items = data.wpgraphql.menu.menuItems.nodes.map(item => ({
    ...item,
    url: item.url.replace(url, '')
  }))

  return (
    <div className="cols">
      <header className="site-header">
        <img src={bio} alt="me" width="75" height="75" />
        <h1>
          <Link to="/" className="home">
            {title}
          </Link>
        </h1>
        <p>Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu.</p>
        {items.map(item => (
          <Link to={item.url} key={item.id}>
            {item.label}
          </Link>
        ))}
      </header>
      <main className="main">{children}</main>
    </div>
  );
}

export default Layout