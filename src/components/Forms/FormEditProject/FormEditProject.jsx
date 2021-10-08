import React, { useState, useRef, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, connect, useSelector } from "react-redux";
import * as Yup from "yup";
import { withFormik } from 'formik';
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../store/constants/CyberBug';

function FormEditProject(props) {
  const arrProjectCategory = useSelector(state => state.ProjectCategory.arrProject);
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setValues, setFieldValue } = props;

  const dispatch = useDispatch();
  const [state, setState] = useState()
  const editorRef = useRef(null);
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  }

  // const submitForm = (e) => {
  //   e.preventDefault();
  //   alert('submitted')
  // }
  //componentdidmount
  useEffect(() => {
    // gọi api load project category
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA })

    //load sự kiện submmit lên drawer nút submit
    dispatch({
      type: 'SET_SUBMIT_PROJECT',
      submitFunction: handleSubmit,
    })
  }, [])

  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p>Project Id</p>
            <input value={values.id} disabled className="form-control" name="id" />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <p>Project Name</p>
            <input value={values.projectName} className="form-control" name="projectName" onChange={handleChange} />
          </div>
        </div>

        <div className="col-4">
          <div className="form-group">
            <p>Category Id</p>
            <select name="categoryId" value={values.categoryId}>
              {arrProjectCategory?.map((item, index) => {
                return <option key={index} value={item.id}>{item.projectCategoryName}</option>
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <p>Description</p>
          <Editor
            name="description"
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={values.description}
            init={{
              selector: 'textarea#myTextArea',
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
      </div>
    </form>
  )
}

const editProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    }

  },
  validationSchema: Yup.object().shape({

  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    // khi người dùng bấm submit => đưa dữ liệu về BE thông qua Api
    const action = {
      type: 'UPDATE_PROJECT_SAGA',
      projectUpdate: values,
    }
    props.dispatch(action);
  },

  displayName: "Edit Project",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectEditReducer.projectEdit
})

export default connect(mapStateToProps)(editProjectForm);

