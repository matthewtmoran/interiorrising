import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import Recaptcha from "react-recaptcha"
import SEO from "../components/seo"
import Layout from "./../components/layout"
import styled from "@emotion/styled"

interface IContact {}

const FORM_ID = "97"
const VALIDATION_FAILED = "validation_failed"
const formUrl = `${process.env.API_URL}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`

const initialValues = {
  name: "",
  email: "",
  message: "",
  recaptcha: "",
}

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  message: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  recaptcha: Yup.string().required(),
})

const StyledForm = styled(Form)`
  width: 100%;
  max-width: 400px;
`

const InputField = styled(Field)`
  width: 100%;
  border: 1px solid #ccc;
  background: #fff;
  margin: 0;
  padding: 10px;

  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`

const TextAreaField = styled(InputField)`
  height: 100px;
  max-width: 100%;
  resize: none;

  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`

const Label = styled("label")`
  margin: 15px 0 0;
  display: block;
  font-size: 13px;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`

const StyleErrorMessage = styled(ErrorMessage)`
  margin: 0 5px;
  display: block;
  font-size: 13px;
  color: red;
  font-style: italic;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`

const Button = styled("button")`
  cursor: pointer;
  width: 100%;
  border: none;
  background: #4caf50;
  color: #fff;
  margin: 5px 0;
  padding: 10px;
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`

const Contact: React.FunctionComponent<IContact> = ({}) => {
  console.log("process.env.RECAPTCHA_SITE_KEY", process.env.RECAPTCHA_SITE_KEY)
  return (
    <Layout>
      <SEO
        title={"Contact"}
        description={"Contact me.  Hire me.  Talk to me."}
      />
      <h1>Contact</h1>
      <p>
        Whether it's about the enneagram, photography, work or you'd just like
        to chat, I'd love to hear from you!
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
          setSubmitting(true)
          setStatus(undefined)

          const bodyFormData = new FormData()
          bodyFormData.set("user-name", values.name)
          bodyFormData.set("user-email", values.email)
          bodyFormData.set("user-message", values.message)

          axios
            .post(formUrl, bodyFormData, {
              headers: { "Content-Type": "application/json; charset=UTF-8" },
            })
            .then(function(response) {
              if (response.data.status === VALIDATION_FAILED) {
                return setStatus({
                  [response.data.status]: response.data.message,
                })
              }
              resetForm()
              setStatus("success")
            })
            .catch(function(error) {
              setStatus("fail")
            })
            .finally(() => {
              setSubmitting(false)
            })
        }}
      >
        {({ isSubmitting, setFieldValue, status }) =>
          status === "success" ? (
            <div>Thanks for reaching out! I'll get back to you shortly.</div>
          ) : (
            <StyledForm>
              <Label htmlFor="name">Name*</Label>
              <InputField type="text" name="name" />
              <StyleErrorMessage name="name" component="div" />

              <Label htmlFor="email">Email*</Label>
              <InputField type="email" name="email" />
              <StyleErrorMessage name="email" component="div" />

              <Label htmlFor="message">Message*</Label>
              <TextAreaField
                type="textarea"
                name="message"
                component="textarea"
              />
              <StyleErrorMessage name="message" component="div" />

              <Recaptcha
                sitekey={process.env.RECAPTCHA_SITE_KEY}
                render="explicit"
                verifyCallback={response => {
                  setFieldValue("recaptcha", response)
                }}
                onloadCallback={() => {
                  console.log("done loading!")
                }}
              />

              {/* if form validation failed */}
              {status !== undefined && status[VALIDATION_FAILED] && (
                <div>{status[VALIDATION_FAILED]}</div>
              )}

              {/* if there is a request failure*/}
              {status !== undefined && status === "fail" && (
                <div>Oops! Something went wrong. Please try again.</div>
              )}

              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </StyledForm>
          )
        }
      </Formik>
    </Layout>
  )
}

export default Contact
