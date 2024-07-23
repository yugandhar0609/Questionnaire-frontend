import React, { useState } from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionnaireForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <Formik
      initialValues={{
        name: "",

        questions: [
          { question: "Tell me about yourself.", answer: "" },
          { question: "Why do you want this job?", answer: "" },
          { question: "What are your strengths?", answer: "" },
          { question: "What are your weaknesses?", answer: "" },
          { question: "Where do you see yourself in five years?", answer: "" },
          { question: "Why should we hire you?", answer: "" },
          // {
          //   question: "Tell me about a time you faced a challenge.",
          //   answer: "",
          // },
          // { question: "How do you handle stress?", answer: "" },
          // { question: "What are your salary expectations?", answer: "" },
          // { question: "Describe a time you worked in a team.", answer: "" },
          // { question: "What motivates you?", answer: "" },
          // { question: "What are your career goals?", answer: "" },
          // { question: "How do you handle criticism?", answer: "" },
          // { question: "Why are you leaving your current job?", answer: "" },
          // { question: "Do you have any questions for us?", answer: "" },
        ],
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        questions: Yup.array()
          .of(
            Yup.object({
              question: Yup.string().required("Required"),
              answer: Yup.string().required("Required"),
            })
          )
          .required("At least one question is required"),
      })}
      onSubmit={async (values) => {
        setSubmitting(true);

        try {
          await axios.post(`${API_URL}/api/questionnaires/post`, values);
          toast.success("Form submitted successfully");
        } catch (error) {
          toast.error("Error creating questionnaire!");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            HR Interview Questions
          </h1>
          <Form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.name && touched.name
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            <FieldArray name="questions">
              {() => (
                <div>
                  {values.questions.map((question, index) => (
                    <div
                      key={index}
                      className="border p-4 rounded-md mb-4 bg-gray-50 shadow-sm"
                    >
                      <div className="mb-4">
                        <label
                          htmlFor={`questions.${index}.question`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Question
                        </label>
                        <Field
                          id={`questions.${index}.question`}
                          name={`questions.${index}.question`}
                          type="text"
                          disabled
                          value={question.question}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 sm:text-sm"
                        />
                      </div>

                      <div className="mt-4">
                        <label
                          htmlFor={`questions.${index}.answer`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Answer
                        </label>
                        <Field
                          id={`questions.${index}.answer`}
                          name={`questions.${index}.answer`}
                          type="text"
                          className={`mt-1 block w-full px-3 py-2 border ${
                            errors.questions?.[index]?.answer
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        />
                        {errors.questions?.[index]?.answer &&
                          touched.questions?.[index]?.answer && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.questions[index].answer}
                            </div>
                          )}
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue(`questions.${index}.answer`, "")
                          }
                          className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300"
                        >
                          Clear Answer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>

            <button
              type="submit"
              className="px-6 py-3 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-400 focus:outline-none focus:ring focus:ring-green-300"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
          <ToastContainer />
        </div>
      )}
    </Formik>
  );
};

export default QuestionnaireForm;
