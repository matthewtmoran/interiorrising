import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Button } from "./../components/layout"
import {
  StyledContainer,
  StyledForm,
  InputField,
  TextAreaField,
  Label,
  StyleErrorMessage,
} from "./SimpleForm"

interface IGenericForm {}

const FORM_ID = "97"
const VALIDATION_FAILED = "validation_failed"
const formUrl = `${process.env.GATSBY_API_URL}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`

const initialValues = {
  name: "",
  email: "",
  message: "",
}

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  message: Yup.string()
    .min(2, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
})

const GenericForm: React.FunctionComponent<IGenericForm> = ({}) => {
  return (
    <StyledContainer>
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
            <Label>
              Thanks for reaching out! I'll get back to you shortly.
            </Label>
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

              {/* if form validation failed */}
              {status !== undefined && status[VALIDATION_FAILED] && (
                <div>{status[VALIDATION_FAILED]}</div>
              )}

              {/* if there is a request failure*/}
              {status !== undefined && status === "fail" && (
                <StyleErrorMessage>
                  Oops! Something went wrong. Please try again.
                </StyleErrorMessage>
              )}

              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </StyledForm>
          )
        }
      </Formik>
    </StyledContainer>
  )
}

export default GenericForm
