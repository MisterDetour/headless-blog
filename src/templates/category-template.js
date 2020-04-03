import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      category(id: $id) {
        name
        id
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
              }
            }
          }
        }
      }
    }
  }
`;

const CategoryTemplate = ({ data }) => {
  const category = data.wpgraphql.category
  const posts = category.posts.nodes;
  return (
    <Layout>
      <h1>{category.name}</h1>
      <div>
        {posts.map(post => (
          <article className="post" key={post.id}>
            <div className="post-meta">
              <span className="date">{post.date}</span>
              <span className="cat">
                {post.categories.nodes.map(category => (
                  <a href={`/blog/${category.uri}`}>{category.name}</a>
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
      </div>
    </Layout>
  );
};

export default CategoryTemplate;
