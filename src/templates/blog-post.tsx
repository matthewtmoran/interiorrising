import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import parse from 'html-react-parser';
import PostImage from '../components/post-image'
import { DomElement } from 'domhandler';

interface IBlogPost {
  data: {
    wordpressPost: {
      title: string
      excerpt: string
      date: string
      content: string
      author: {
        name: string
      }
      acf: {
        featured_image: null | {
          localFile: {
            childImageSharp: {
              sizes: any
            }
          }
        }
      }
    }
  }
}

const BlogPost: React.FunctionComponent<IBlogPost> = ({ data }) => {
  return (
    <Layout>
      <SEO
        title={data.wordpressPost.title}
        description={data.wordpressPost.excerpt}
      ></SEO>
      <h1>{data.wordpressPost.title}</h1>
      <p>
        Written by {data.wordpressPost.author.name} on {data.wordpressPost.date}
      </p>

      {data.wordpressPost.acf.featured_image?.localFile.childImageSharp.sizes &&
        <Img
          sizes={
            data.wordpressPost.acf.featured_image.localFile.childImageSharp.sizes
          }
          alt={data.wordpressPost.title}
          style={{ maxHeight: 450 }}
        />
      }


    <div className="photo-gallery" style={{width:'100%', height: '100%'}}>
      {parse(data.wordpressPost.content, {replace: replaceMedia})}
    </div>

    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
      author {
        name
      }
      acf {
        featured_image {
          localFile {
            childImageSharp {
              sizes(maxWidth: 1200) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
  }
`

const getImage = (node:DomElement) => {
  if (node.name === 'img') {
    return node;
  } else if (node.children != null) {
    for (let index = 0; index < node.children.length; index++) {
      let image = getImage(node.children[index]);
      if (image !== null) return image;
    }
  }
};

const replaceMedia = (node:DomElement) => {
  // replaces inline gallery images with our components
  if(node.name ==='li' && node.attribs.class.includes("blocks-gallery-item") ) {
    const image = getImage(node);
    if (image !== null) {
      return <PostImage key={image.attribs.src} src={image.attribs.src} alt={image.attribs.alt} width={image.attribs.width}/>;
    }
  } 

  // replaces gallery ul element with fragment
  if (node.name === "ul" && node.attribs.class.includes("wp-block-gallery")){
    return <>{node.children.map(n => (replaceMedia(n)))}</>
  }
};

export default BlogPost
