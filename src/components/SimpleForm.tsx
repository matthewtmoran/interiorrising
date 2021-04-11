import React, { useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Button } from "./../components/layout"
import styled from "@emotion/styled"

interface IGenericForm {
  formName: string
}

const VALIDATION_FAILED = "validation_failed"

const initialValues = {
  name: "",
  email: "",
}

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
})

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const SimpleForm: React.FunctionComponent<IGenericForm> = ({ formName }) => {
  return (
    <StyledContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
          setSubmitting(true)
          setStatus(undefined)

          // const bodyFormData = new FormData()
          // bodyFormData.set("user-name", values.name)
          // bodyFormData.set("user-email", values.email)
          fetch("/?no-cache=1", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
              "form-name": `${formName}-contact`,

              ...values,
            }),
          })
            .then(response => {
              resetForm()
              setStatus("success")
            })
            .catch(error => {
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
            <StyledForm
              name={`${formName}-contact`}
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <input
                type="hidden"
                name="form-name"
                value={`${formName}-contact`}
              />
              <input type="hidden" name="bot-field" />

              <Label htmlFor="name">Name*</Label>
              <InputField type="text" name="name" />
              <StyleErrorMessage name="name" component="div" />

              <Label htmlFor="email">Email*</Label>
              <InputField type="email" name="email" />
              <StyleErrorMessage name="email" component="div" />

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
    </StyledContainer>
  )
}

export default SimpleForm

export const StyledContainer = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const StyledForm = styled(Form)`
  width: 100%;
  max-width: 400px;
`

export const InputField = styled(Field)`
  width: 100%;
  border: 1px solid #ccc;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  margin: 0;
  padding: 10px;

  &:focus: {
    color: #fff;
  }
`

export const TextAreaField = styled(InputField)`
  height: 100px;
  max-width: 100%;
  resize: none;
`

export const Label = styled("label")`
  color: #fff;
  display: block;
  font-size: 1rem;
  margin: 15px 0 0;
  text-align: left;
`

export const StyleErrorMessage = styled(ErrorMessage)`
  color: red;
  display: block;
  font-size: 13px;
  font-weight: bold;
  margin: 0 5px;
  text-align: left;
`
