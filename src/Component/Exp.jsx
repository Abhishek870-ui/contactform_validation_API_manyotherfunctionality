import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import "./css/style.css"

export default function Exp() {
    const url = "http://localhost:3000/contact"
    const { id } = useParams()

    //States declares here
    // this state is used to insert, fetch data for edit 
    const [data, setData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        gender: '',
        hobbies: [],
        message: '',
        image: '',
        filepath: '',
        degree: '',
        subjects: ''

    })
    //this state is used to show errors downside to the input fields
    const [errormessage, setErrormessage] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        gender: '',
        hobbies: [],
        message: '',
        image: '',
        filepath: '',
        degree: "",
        subjects: "",
        percentage: ""

    })
    const [count, setCount] = useState(0) // Name it however you wish

    let { fname, lname, email, phone, gender, hobbies, message, image } = data;
    //this state is used show image if we select a image
    const [fileimage, setFileimage] = useState(null);

    // this function is used to validate the input fields
    const validationcommon = (value, type) => {

        switch (type) {

            case 'string': {
                if (value) {
                    const strings = /^[a-zA-Z]{1,}$/;
                    if (value && value.match(strings) && value.trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return 'empty';
            }

            case 'string1': {
                if (value) {
                    const strings = /^[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
                    if (value && value.match(strings) && value.trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return 'empty';
            }

            case 'email': {
                if (value) {
                    const strings = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (value && value.match(strings) && value.trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return 'empty';
            }

            case 'number1': {
                if (value) {
                    const strings = /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
                    if (value && value.match(strings) && value.trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return 'empty';
            }

            case 'number': {
                if (value) {
                    const strings = /^(\+\d{1,3}[- ]?)?\d{10}$/
                    if (value && value.match(strings) && value.trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return 'empty';
            }

            case 'message': {
                if (value) {
                    if (value && value.trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return 'empty';
            }

            case 'image': {
                if (value) {
                    console.log("image", value);
                    let ext = value.split('.');
                    if (value && (ext[1] === "jpg" || ext[1] === 'jpeg' || ext[1] === 'png' || ext[1] === 'gif' || ext[2] === "jpg" || ext[2] === 'jpeg' || ext[2] === 'png' || ext[2] === 'gif')) {
                        return true;
                    } else if (value.length < 5) {
                        return false;
                    }
                    else {
                        return false;
                    }
                }
                return 'empty';
            }



            default:
                break;
        }

    }

    //in this function we call validation common function to set error message
    const keyupValdation = (e, type) => {
        const { name, value } = e.target
        const res = validationcommon(value, type)
        let error
        if (res === 'empty') {
            error = "please enter your " + name
            return error;

        } else if (res === false) {
            error = "please enter your valid " + name
            return error;
        }
    }

    //this function is used to show error by clicking on tab
    const onKeyDown = (e, type) => {
        if (e.key === "Tab") {
            const { name, value } = e.target
            keyupValdation(e, type)
            setData({
                ...data, [name]: value
            })
            if (e.target.files) {
                setFileimage(e.target.files[0])
            }
            let error = keyupValdation(e, type)
            if (error) {
                e.preventDefault();

                setErrormessage({ ...errormessage, [name]: error })
                return error;
            } else {
                setErrormessage({ ...errormessage, [name]: '' })
                return error;

            }
        }
    };

    // this function is used for target input fields and also showing errors by this function

    const update = (e, type) => {
        const target = e.target
        const name = target.name
        const value = target.value
        setData({
            ...data, [name]: value
        })
        if (e.target.files) {
            setFileimage(e.target.files[0])
        }
        let error = keyupValdation(e, type)
        if (error) {
            setErrormessage({ ...errormessage, [name]: error })
            return error;
        } else {
            setErrormessage({ ...errormessage, [name]: '' })
            return error;

        }
    }

    // this function is used to target hobbies value and show errors down to it
    const changeHandle = (e, type) => {
        const { value, checked } = e.target
        const name = e.target.name
        let obj = data.hobbies;
        if (checked) {
            obj.push(value)
        }
        else {
            obj.splice(obj.findIndex(e => e.value === { value }), 1);
        }
        setData({
            ...data, [obj]: value
        })
        let error = keyupValdation(e, type)
        if (error) {
            e.preventDefault();
            setErrormessage({ ...errormessage, [name]: error })
            return error;
        } else {
            setErrormessage({ ...errormessage, [name]: '' })
            return error;

        }

    }

    // const educationdetailssubmit = (e) => {
    //     formValues.map((element, index) => (
    //         Axios.post("http://localhost:8080/insert/educationdetails", {
    //           "degree": `${element.degree}`,
    //           'subjects': `${element.subjects}`,
    //           'percentage': `${element.percentage}`
    //         }).then(res => {
    //           console.log("insert new member data : ", res.data)
    //           // console.log("form data that we assign : " + formData)
    //         })
    //           .catch(err => {
    //             console.log("error has occured while insert new member : " + err)
    //           })

    //       ))

    // }

    const submit = (e) => {
        // e.preventDefault();
        setErrormessage(null)

        let error = validateForm();
        if (error) {

            setErrormessage(error)
            console.log("fill the input field")
            return;
        }
        else {

            {
                if (!id) {

                    let formData = new FormData();
                    formData.append('image', document.querySelector('#image').files[0]);
                    formData.append('fname', data.fname);
                    formData.append('lname', data.lname);
                    formData.append('email', data.email);
                    formData.append('phone', data.phone);
                    formData.append('gender', data.gender);
                    formData.append('hobbies', data.hobbies);
                    formData.append('message', data.message);
                    formData.append("formValues", JSON.stringify(formValues))

                    console.log("this is data : ", data)
                    console.log("this is formValues : ", formValues)
                    Axios.post("http://localhost:8080/insert/registerUser", formData).then(res => {
                        console.log("insert new member data : ", res.data)
                        console.log("form data that we assign : " + formData)
                        alert("Data submitted successfull", formData)
                    })
                        .catch(err => {
                            console.log("error has occured while insert new member : " + err)
                        })

                }

                else {
                    console.log(data);
                    let formData = new FormData();
                    formData.append('image', document.querySelector('#image').files[0]);
                    formData.append('fname', data.fname);
                    formData.append('lname', data.lname);
                    formData.append('id', id);

                    formData.append('email', data.email);
                    formData.append('phone', data.phone);
                    formData.append('gender', data.gender);
                    formData.append('hobbies', data.hobbies);
                    formData.append('message', data.message)
                    formData.append("formValues", JSON.stringify(formValues))

                    console.log("form data for update above : ", formData)

                    Axios.post(`http://localhost:8080/update/updateContact`, formData).then(res => {
                        // console.log("update the data by id : ", res.data)
                        //console.log("form data of an id : " + formData)
                    })
                        .catch(err => {
                            console.log("error has occured while on update : " + err)
                        })
                }
                alert("Data submitted successfull")
                // window.location.reload();
            }
        }
    }

    useEffect(() => {
        if (id != null) {


            Axios.get(`http://localhost:8080/fetch/contactDetailsbyid/${id}`)
                .then((response) => {
                                       let hobbiesAr = response.data[0].hobbies
                    console.log(hobbiesAr.split(','), 'my api hobbies')
                    console.log("image name", response.data[0])
                    console.log("res", response)
                    setData({
                        ...data,
                        fname: response.data[0].fname,
                        lname: response.data[0].lname,
                        email: response.data[0].email,
                        phone: response.data[0].phone,
                        gender: response.data[0].gender,

                        hobbies: hobbiesAr.split(','),

                        message: response.data[0].message,
                        image: '',
                        filepath: response.data[0].image


                    })
                    let arr = []
                    console.log((response.data).length, "length")
                    for (let i = 0; i < (response.data).length; i++) {
                       
                        console.log((response.data)[i].degree, "response.data[i].degree")

                        arr.push({degree: response.data[i].degree,
                                subjects: response.data[i].subjects,
                                percentage: response.data[i].percentage})
                       
                    }
                    setFormValues(arr)
                })

                .catch(err => {
                    console.log("error has occured" + err)
                })

        }


    }, []);


    const validateForm = () => {
        let error = false;

        if (fname.trim() === '') {
            error = {
                field_id: "fname",
                message: " * first name can't be pass blank"
            }
            return error;
        }
        if (fname === '') {
            error = {
                field_id: "fname",
                message: " * first name is required"
            }
            return error;
        }

        let fnamecond = /^[A-Za-z\s]+$/
        if (fnamecond.test(fname) === false) {
            error = {
                field_id: "fname",
                message: "* first name is not correct"
            }
            return error;
        }

        if (lname.trim() === '') {
            error = {
                field_id: "lname",
                message: "Last name can't be pass blank"
            }
            return error;
        }

        if (lname === '') {
            error = {
                field_id: "lname",
                message: "Last name is required"
            }
            return error;
        }

        let lnamecond = /^[A-Za-z\s]+$/
        if (lnamecond.test(lname) === false) {
            error = {
                field_id: "lname",
                message: "* Last name is not correct"
            }
            return error;
        }

        if (email === '') {
            error = {
                field_id: "email",
                message: "Email is required"
            }
            return error;
        }
        const emailcond = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (emailcond.test(email) === false) {
            error = {
                field_id: "email",
                message: "Email is not correct"
            }
            return error;
        }

        if (phone === '') {
            error = {
                field_id: "phone",
                message: "Phone number is required"
            }
            return error;
        }

        let phonecond = /^(\+\d{1,3}[- ]?)?\d{10}$/
        if (phonecond.test(phone) === false) {
            error = {
                field_id: "phone",
                message: "* Phone number is not correct"
            }
            return error;
        }




        if (gender === '') {
            error = {
                field_id: "gender",
                message: "Choose your gender"
            }
            return error;
        }

        if (hobbies.length < 1) {
            error = {
                field_id: "hobbies",
                message: "Choose your hobbies"
            }
            return error;
        }


        if (message === '') {
            error = {
                field_id: "mess",
                message: "Enter some message"
            }
            return error;
        }




        if (!id) {
            if (image === '') {
                error = {
                    field_id: "image",
                    message: "choose the image"
                }
                return error;
            }
            let ext = image.split('.');
            console.log("imagespillter", ext)
            // alert(ext[1])
            if (ext[1] === "jpg" || ext[1] === 'jpeg' || ext[1] === 'png' || ext[1] === 'gif' || ext[2] === "jpg" || ext[2] === 'jpeg' || ext[2] === 'png' || ext[2] === 'gif') {
                console.log("image passsed")
            }
            else {
                error = {
                    field_id: "image",
                    message: "* only image should be here"
                }

                return error;
            }
        }


    }

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

    // console.log(formValues.degree, "formValues after")


    return (
        <>

            <div encType="multipart/form-data" className='container'>
                <h1>Get In Touch</h1>
                <label>First Name *</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text"
                    id='fname'
                    onChange={(e) => update(e, 'string')}
                    name="fname"
                    value={data.fname}
                    placeholder="Enter First name"
                    className="fname"
                    // onClick={(e) => onClick(e, 'string')}
                    onKeyDown={(e) => onKeyDown(e, 'string')}

                />
                {/* {console.log("fname",errormessage.fname,"***",errormessage)} */}
                {errormessage && errormessage.fname !== '' ? <p>{errormessage.fname}</p> : null}
                {errormessage && errormessage.field_id === 'fname' ? <p>{errormessage.message}</p> : null}

                {/* {errormessage && errormessage.fname != ''  ? <span> { errormessage.field_id === 'fname' ? <p>{errormessage.message}</p> : null}</span> : null} */}
                <br></br>

                <label>Last Name *</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text"
                    id='lname'
                    onChange={(e) => update(e, 'string')}
                    name="lname"
                    value={data.lname}
                    placeholder="Enter Last name"
                    className="lname"
                    // onClick={(e) => onClick(e, 'string')}
                    onKeyDown={(e) => onKeyDown(e, 'string')}
                />
                {errormessage && errormessage.lname !== '' ? <p>{errormessage.lname}</p> : null}

                {/* {errormessage.lname != '' ? <span> { errormessage.field_id === 'lname' ? <p>{errormessage.message}</p> : null}</span> : null} */}
                {errormessage && errormessage.field_id === 'lname' ? <p>{errormessage.message}</p> : null}
                <br></br>

                <label>Email *</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text"
                    id='email'
                    onChange={(e) => update(e, 'email')}
                    name="email"
                    value={data.email}
                    placeholder="Enter Email Address"
                    className="email"
                    onKeyDown={(e) => onKeyDown(e, 'email')}
                />
                {errormessage && errormessage.email !== '' ? <p>{errormessage.email}</p> : null}

                {errormessage && errormessage.field_id === 'email' ? <p>{errormessage.message}</p> : null}
                <br></br>

                <label>Phone number *</label>
                <input type="text"
                    id='phone'
                    onChange={(e) => update(e, 'number')}
                    name="phone" value={data.phone}
                    placeholder="Enter phone number"
                    className="num"
                    onKeyDown={(e) => onKeyDown(e, 'number')}
                />
                {errormessage && errormessage.phone !== '' ? <p>{errormessage.phone}</p> : null}

                {errormessage && errormessage.field_id === 'phone' ? <p>{errormessage.message}</p> : null}
                <br></br>

                <label className='selectgender'
                    id="myForm">Gender *</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="radio"
                    onChange={(e) => update(e)}
                    name="gender"
                    value="male"
                    id="gender"
                    onKeyDown={(e) => onKeyDown(e, 'gender')}
                    checked={data.gender === 'male'}
                /> Male
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="radio"
                    onChange={(e) => update(e)}
                    name="gender"
                    value="female"
                    id="gender"
                    onKeyDown={(e) => onKeyDown(e, 'gender')}
                    checked={data.gender === 'female'}
                /> Female
                {errormessage && errormessage.gender !== '' ? <p>{errormessage.gender}</p> : null}

                {errormessage && errormessage.field_id === 'gender' ? <p>{errormessage.message}</p> : null}



                <br /><br />

                <label className='hobbies' name="hobbies" value={data.hobbies}>Hobbies *</label>
                <input type="checkbox"
                    onChange={(e) => changeHandle(e)}
                    name="hobbies"
                    value="reading"
                    onKeyDown={(e) => onKeyDown(e, 'hobbies')}
                    checked={(data.hobbies).includes("reading")} />Reading

                <input type="checkbox"
                    onChange={(e) => changeHandle(e)}
                    name="hobbies"
                    value="playing"
                    onKeyDown={(e) => onKeyDown(e, 'hobbies')}
                    checked={(data.hobbies).includes("playing")} />Playing

                <input type="checkbox"
                    onChange={(e) => changeHandle(e)}
                    name="hobbies"
                    value="programming"
                    onKeyDown={(e) => onKeyDown(e, 'hobbies')}
                    checked={(data.hobbies).includes("programming")} />programming<br />
                {errormessage && errormessage.hobbies !== '' ? <p>{errormessage.hobbies}</p> : null}

                {errormessage && errormessage.field_id === 'hobbies' ? <p>{errormessage.message}</p> : null}
                <br></br>

                <label>Message *</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <textarea type="message"
                    cols="50"
                    onChange={(e) => update(e, 'mess')}
                    name="message"
                    id='message'
                    value={data.message}
                    placeholder="Type your message here"
                    className="msg"
                    onKeyDown={(e) => onKeyDown(e, 'mess')}
                >
                </textarea>
                {errormessage && errormessage.field_id === 'mess' ? <p>{errormessage.message}</p> : null}
                {/* {errormessage && errormessage.message !== '' ? <p>{errormessage.message}</p> : null} */}

                <br></br>
                <label>Image *</label>
                <input type="file"
                    className="image" onChange={(e) => update(e, "image")}
                    name="image"
                    id="image"
                    onKeyDown={(e) => onKeyDown(e, 'image')}

                    value={data.image} /> <br />
                {errormessage && errormessage.image !== '' ? <p>{errormessage.image}</p> : null}

                {errormessage && errormessage.field_id === 'image' ? <p>{errormessage.message}</p> : null}
                <br></br>
                {fileimage ? <img id="selectImage" src={fileimage ? URL.createObjectURL(fileimage) : null} alt={fileimage ? fileimage.name : null} /> : <p>{data.filepath === '' ? null : <img src={`${data.filepath}`} id='imagesize'></img>}</p>}

                {/* Eductaion details start here */}
                <h1>Education Details</h1>


                <form >

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
                    </div>
                </form>
                <br></br>
                {
                    !id ? <button type="button" onKeyDown={onKeyDown} onClick={(e) => submit(e)} className="sub">Submit</button> : <button type="button" onClick={(e) => submit(e)} onKeyDown={onKeyDown} className="sub">Update</button>
                }
                <h1>click <a href='/contact-details'>here</a> to go contact details Page.</h1>

            </div>

        </>
    )
}
