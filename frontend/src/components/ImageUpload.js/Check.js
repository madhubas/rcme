import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { TextField } from "../TextField";

const Check = ({ match }) => {
  useEffect(() => {
    axios
      .get(`http://localhost:3050/usersing/${match.params.id}`)
      .then((response) => console.log(response.data));
  });
  const validate = Yup.object({
    file: Yup.mixed().required(),
  });
  return (
    <Formik
      initialValues={{
        file: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {}}
    >
      {(formik) => (
        <div>
          <h1 className="my-4 font-weight-bold .display-4">Admin Login</h1>
          <Form>
            <TextField label="username" name="userName" type="file" />

            <button className="btn btn-dark mt-3" type="submit">
              Login
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Check;
