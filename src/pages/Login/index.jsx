import React from "react";
import { Button, Input } from "antd";
import { withFormik } from "formik";
import { UserOutlined, LockOutlined, TwitterOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { connect } from "react-redux";
import { USER_SIGNIN_API } from "../../store/constants/CyberBug";
import { actionJiraCLoneSignIn } from "../../store/actions/JiraCloneAction";

function Login(props) {

  console.log(props);
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} className="container" style={{ height: window.innerHeight }}>
      <div className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight }}>
        <div>
          <h3 className="text-center"> Login </h3>
          <div className="d-flex mt-3">
            <Input onChange={handleChange} name="email" size="large" style={{ width: '100%', minWidth: 300 }} placeholder="Email" prefix={<UserOutlined />} />
          </div>
          <div className="text-danger"> {errors.email} </div>
          <div className="d-flex mt-3">
            <Input type='password' onChange={handleChange} name="password" size="large" style={{ width: '100%', minWidth: 300 }} placeholder="Password" prefix={<LockOutlined />} />
          </div>
          <div className="text-danger"> {errors.password} </div>

          <Button type="submit" onClick={handleSubmit} size="large" style={{ minWidth: 300, backgroundColor: "rgb(102,117,223)", color: "#fff" }} className="mt-5">
            Login
          </Button>
          <div className="d-flex mt-3 social justify-content-center">
            <Button style={{ backgroundColor: "rgb(59,89,152,2)" }} shape="circle" size={"large"}>
              <span className="font-weight-bold" style={{ color: "#fff" }}>F</span>
            </Button>
            <Button htmlType="submit" type="primary ml-3" shape="circle" icon={<TwitterOutlined size="large" />} size={"large"}></Button>
          </div>
        </div>
      </div>
    </form>
  );
}

const LoginCyberBugWithFormilk = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("Email is invalid!"),
    password: Yup.string()
      .min(6, "password must have min 6 characters")
      .max(32, "password have max 32 characters"),
  }),
  handleSubmit: ({ email, password }, { props, setSubmitting }) => {
    setSubmitting(true);
    props.dispatch(actionJiraCLoneSignIn(email, password, props.history));
    // props.dispatch(signInCyberBugAction(email, password));
    // dispatch(signInCyberBugAction(email, password));
  },

  displayName: "BasicForm",
})(Login);

export default connect()(LoginCyberBugWithFormilk);
