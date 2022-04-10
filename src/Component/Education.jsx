import axios from 'axios';
import React, { useState } from 'react'
const Education = () => {

  const [formValues, setFormValues] = useState([{ degree: "", subjects: "", percentage: "" }])

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }

  let addFormFields = () => {
    setFormValues([...formValues, { degree: "", subjects: "", percentage: "" }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
    // let formData = new FormData();
    // formData.append('degree', formValues.degree);
    // formData.append('subjects', formValues.subjects);
    // formData.append('percentage', formValues.percentage);

    // console.log("this is data : ", formValues)



    {
      formValues.map((element, index) => (
        axios.post("http://localhost:8080/insert/educationdetails", {
          "degree": `${element.degree}`,
          'subjects': `${element.subjects}`,
          'percentage': `${element.percentage}`
        }).then(res => {
          console.log("insert new member data : ", res.data)
          // console.log("form data that we assign : " + formData)
        })
          .catch(err => {
            console.log("error has occured while insert new member : " + err)
          })

      ))
    }

    // console.log(formValues,"formValues.degree")
    //     axios.post("http://localhost:8080/insert/educationdetails", {
    //       "degree":`${formValues[0].degree}`,
    //       'subjects': `${formValues[0].subjects}`,
    //       'percentage': `${formValues[0].percentage}`
    //     }).then(res => {
    //         console.log("insert new member data : ", res.data)
    //         // console.log("form data that we assign : " + formData)
    //     })
    //         .catch(err => {
    //             console.log("error has occured while insert new member : " + err)
    //         })
  }

  return (
    <form onSubmit={handleSubmit}>


      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <label>Degree</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <input type="text"
            name="degree"
            value={element.degree || ""}
            onChange={e => handleChange(index, e)} />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label>Subjects</label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text"
            name="subjects"
            value={element.subjects || ""}
            onChange={e => handleChange(index, e)} />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;
          <label>Percentage</label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text"
            name="percentage"
            value={element.percentage || ""}
            onChange={e => handleChange(index, e)} />
          {
            index ?
              <button type="button" className="button_remove" onClick={() => removeFormFields(index)}>Remove</button>
              : null
          }
        </div>
      ))}


      <div className="button-section">
        <button className="button_add" type="button" onClick={() => addFormFields()}>Add</button>
        <button className="button_submit" type="submit">Submit</button>
      </div>
    </form>
  )
}

export default Education