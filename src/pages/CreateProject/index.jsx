import React, { useRef, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import * as Yup from "yup";
import { withFormik } from 'formik';
import { connect, useSelector, useDispatch } from 'react-redux'
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../store/constants/CyberBug';

function CreateProject(props) {
  const dispatch = useDispatch();

  const arrProjectCategory = useSelector(state => state.ProjectCategory.arrProject);
  console.log("ket qua: ", arrProjectCategory);

  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_SAGA
    })
  }, []);

  const { values, touched, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue } = props;

  const handleEditorChange = (content, editor) => {
    setFieldValue('description', content);
  }

  const editorRef = useRef(null);
  return (
    <div className="container m-5">
      <h3>Create Project</h3>
      <form className="container" onSubmit={handleSubmit} onChange={handleChange}>
        <div className="form-group">
          <p>Name: </p>
          <input className="form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p>Description: </p>
          <input className="form-control" name="description" />
          <Editor
            name="description"
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
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
        <div className="form-group mt-3">
          <select name="categoryId" className="form-control" onChange={handleChange}>
            {arrProjectCategory.map((item) => {
              return <option key={item} value={item.id}>{item.projectCategoryName}</option>
            })}
          </select>
        </div>

        <button className="btn btn-success mt-3">Create Project</button>
      </form>
    </div>
  )
}

const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id
    }

  },
  validationSchema: Yup.object().shape({

  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type:'CREATE_PROJECT_SAGA',
      newProject: values
    })
  },

  displayName: "Create Project",
})(CreateProject);

const mapStateToProps = (state) => ({
  arrProjectCategory: state.ProjectCategory.arrProject
})

export default connect(mapStateToProps)(createProjectForm);
