import React from "react";
import { MainForm } from "../components";
import { Link } from "react-router-dom";
import { Field, ErrorMessage } from "formik";
import recoveryFormSchema from "../validation/recoveryFormSchema";
import useFetch from "../hooks/useFetch";

export default function PasswordRecovery() {
  const { datas } = useFetch("http://localhost:4000/users");

  const recoverPassword = (values, { setSubmitting }) => {
    setTimeout(() => {
      const validUser = datas.find((data) =>
        [data.username, data.email].includes(values.EmailOrUsername)
      );
      console.log(validUser.password)
      setSubmitting(false);
    }, 3000);
  };

  const recoveryFormProps = {
    submitBtn: "ثبت",
    title: "بازنشانی رمز عبور",
    smText: "یک عمل دیگر انجام دهید.",
    linkText: "هم اکنون ثبت نام کنید!",
    linkSrc: "/register",
    submitFn: recoverPassword,
    validationSchema: recoveryFormSchema,
    initialValues: {
      EmailOrUsername: "",
    },
  };
  return (
    <MainForm
      {...recoveryFormProps}
      recoveryBtn={
        <>
          یا
          <Link
            to={"/login"}
            className="w-fit border-[1px] border-gray-300 rounded-[5px] px-3 font-medium hover:bg-gray-300 transition-all duration-300"
          >
            <small>وارد شوید!</small>
          </Link>
        </>
      }
    >
      <Field
        type="text"
        name="EmailOrUsername"
        placeholder="نام کاربری یا ایمیل"
      />
      <ErrorMessage name="username" component="span" className="err-msg" />
    </MainForm>
  );
}
