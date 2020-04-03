import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

export const query = graphql`
  query {
    wpgraphql {
      posts {
        nodes {
          id
          title
          uri
          excerpt
          date
          categories {
            nodes {
              name
              uri
              id
            }
          }
        }
      }
    }
  }
`

const Blog = ({ data }) => {
  const posts = data.wpgraphql.posts.nodes
  const pageInfo = data.wpgraphql.posts.pageInfo

  return (
    <Layout>
      {posts.map(post => (
        <article className="post" key={post.id}>
          <div className="post-meta">
            <span className="date">{post.date}</span>
            <span className="cat">
              {post.categories.nodes.map(category => (
                <a href={`/blog/${category.uri}`} key={category.id}>{category.name}</a>
              ))}
            </span>
          </div>
          <h2>
            <Link
              to={`/blog/${post.uri}`}
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
          </h2>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          <Link to={`/blog/${post.uri}`} className="more">
            Read
          </Link>
        </article>
      ))}
    </Layout>
  );
}

export default Blog