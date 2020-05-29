import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import Recaptcha from "react-recaptcha"
import SEO from "../components/seo"
import Layout from "./../components/layout"
import styled from "@emotion/styled"

const Contact: React.FunctionComponent<{}> = ({}) => {
  return (
    <Layout>
      <SEO
        title={"Enneagram"}
        description={
          "Information about enneagram coaching, enneagram workshops, enneagram speaking events, and enneagram courses.  "
        }
      />
      <h1>Lets Talk Enneagram</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam quod
        tempore, neque unde itaque numquam laborum eum nisi, quaerat maiores
        accusantium distinctio harum amet deserunt ut velit commodi autem sed!
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur,
        iure sint eum itaque, nihil recusandae molestiae omnis facere et nulla
        soluta! Dolores totam amet quod veritatis soluta minima dignissimos
        quibusdam!
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam quod
        tempore, neque unde itaque numquam laborum eum nisi, quaerat maiores
        accusantium distinctio harum amet deserunt ut velit commodi autem sed!
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam quod
        tempore, neque unde itaque numquam laborum eum nisi, quaerat maiores
        accusantium distinctio harum amet deserunt ut velit commodi autem sed!
      </p>
      <ButtonContainer>
        <Button>1:1 Enneagram Guidance</Button>
        <Button>1:1 Enneagram Masterclass</Button>
        <Button>Other</Button>
      </ButtonContainer>
    </Layout>
  )
}

const ButtonContainer = styled("div")`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 420px) {
    flex-direction: row;
  }
`

const Button = styled("button")`
  flex: 1;
  width: 200px;
  cursor: pointer;
  border: none;
  background: #4caf50;
  color: #fff;
  margin: 1rem;
  padding: 10px;
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`

export default Contact
