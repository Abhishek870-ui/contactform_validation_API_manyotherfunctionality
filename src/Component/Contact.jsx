import React, { useState, useEffect } from 'react';
import './css/register.css';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import ImageUploading from "react-images-uploading";

export default function Contact() {
    const url = "http://localhost:3000/contact"
    const [data, setData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        Gender: '',
        Hobbies: [],
        Message: '',
        image: ''

    })
    const [errorMessage, setErrorMessage] = React.useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        Gender: '',
        Hobbies: [],
        Message: '',
        image: ''
    });
    const [images, setImages] = useState([]);
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    function submit(e) {
        let fname = data.fname,
            lname = data.lname,
            email = data.email,
            phone = data.phone,
            Hobbies = data.Hobbies,

            Message = data.Message
        const regex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        let errors = errorMessage;
        if (fname === '') {
            let error = {
                field_id : "fname",
                message : "first name is required"
            }
            console.log('data',data )
            console.log('data fname',data.fname )
            console.log("my fname error is in var er",fname)
           
            //fnameErr = "Please enter first name."
            // alert("please enter first name")
            // setErrorMessage("please enter first name")
            // errors.fname = "please enter first name"
            // console.log("my new error here",errors.fname)
            
        }
        else if (lname === '') {
            console.log(data, 'data')
            //lnameErr = "Please enter Name."
            alert("Please enter last name")
            // setErrorMessage("Please enter last name")
            errors.lname = "please enter last name"

        }
        else if (email === '') {
            console.log(data, 'data')
            //emailErr = "Please enter email."
            alert("Please enter email")
            errors.email = "please enter email"

        }
        else if (phone === '') {
            console.log(data, 'data')
            //numberErr = "Please enter Number."
            alert("Please enter Number")
            errors.phone = "please enter phone number"

        }
        else if (regex.test(phone) === false) {
            console.log(data, 'data')
            //numberErr = "Please enter number only."
            alert("Please enter number only.")
            errors.phone = "please enter phone number"

        }
        else if (phone.toString().length < 10) {
            console.log(data, 'data')
            // numberErr="Number must be 10 digits";
            alert("Number must be 10 digits")
            errors.phone = "please enter phone number"

        }
        else if (data.Gender === '') {

            console.log(data, 'data')
            // GenderErr = "Please enter your Gender."
            alert("Please enter your Gender.")
            errors.Gender = "please choose Gender "

        }

        else if (Hobbies.length < 1) {
            console.log(data, 'data')
            // HobbiesErr="Please select atleast one Hobbies"
            alert("Please select you Hobbies ")
            errors.Hobbies = "please choose Hobbies "

        }
        else if (Message === '') {
            console.log(data, 'data')
            alert("Please enter Message.")
            errors.Message = "please enter Message "


        }

        else {
            let formData = new FormData();
            formData.append('image', document.querySelector('#image').files[0]);
            formData.append('fname', data.fname);
            formData.append('lname', data.lname);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('Gender', data.Gender);
            formData.append('Hobbies', data.Hobbies);
            formData.append('Message', data.Message);

            {
                if (!id) {
                    Axios.post("http://localhost:8080/insert/registerUser", formData).then(res => {
                        console.log(res.data)
                        console.log("form" + formData)
                    })
                        .catch(err => {
                            console.log("error has occured" + err)
                        })
                }
                else {
                    Axios.post(`http://localhost:8080/update/updateContact/${id}`, formData).then(res => {
                        console.log(res.data)
                        console.log("form1234" + formData)
                    })
                        .catch(err => {
                            console.log("error has occured" + err)
                        })
                }
                // console.log(data.image[0].name)
            }
        }
        // setErrorMessage(error);
        // console.log("errors are :", errors.fname)
       
    }
    console.log(data);
    // alert("Submitted")
    // setErrorMessage(errors);
    // console.log("errors are :", errors.fname)

    //     let formData = new FormData();
    //     formData.append('image', document.querySelector('#image').files[0]);
    //     formData.append('fname', data.fname);
    //     formData.append('lname', data.lname);
    //     formData.append('email', data.email);
    //     formData.append('phone', data.phone);
    //     formData.append('Gender', data.Gender);
    //     formData.append('Hobbies', data.Hobbies);
    //     formData.append('Message', data.Message);

    //     {
    //         if (!id) {
    //             Axios.post("http://localhost:8080/insert/registerUser", formData).then(res => {
    //                 console.log(res.data)
    //                 console.log("form" + formData)
    //             })
    //                 .catch(err => {
    //                     console.log("error has occured" + err)
    //                 })
    //         }
    //         else {
    //             Axios.post(`http://localhost:8080/update/updateContact/${id}`, formData).then(res => {
    //                 console.log(res.data)
    //                 console.log("form1234" + formData)
    //             })
    //                 .catch(err => {
    //                     console.log("error has occured" + err)
    //                 })
    //         }
    //         // console.log(data.image[0].name)
    //     }
    // }

    function update(e) {
        const target = e.target
        const name = target.name
        const value = target.value
        setData({
            ...data, [name]: value
        })
    }
    const handleChange = (event) => {
        const target = event.target
        const name = target.name

        const value = target.value
        setData({
            ...data, [name]: value

        })

    }

    const changeHandle = (event) => {
        const { value, checked } = event.target
        let obj = [data.Hobbies];
        console.log("first value", obj)

        if (checked) {
            obj.push(value)
            console.log(obj);
        }
        else {
            obj.pop(value)
            console.log(obj);
        }

    }
    console.log(data.Hobbies)
    const { id } = useParams()
    useEffect(() => {
        if (id != null) {

            Axios.get(`http://localhost:8080/fetch/contactDetailsbyid/${id}`)
                .then((response) => {
                    console.log("vhgvfywfgu", response.data);

                    // setData(response.data)
                    console.log(response.data[0].fname)
                    console.log("image name", response.data[0])

                    // console.log("Data",...data,fname : value);
                    // console.log(response.data[0].image.split()[1])
                    setData({
                        ...data,
                        fname: response.data[0].fname,
                        lname: response.data[0].lname,
                        email: response.data[0].email,
                        phone: response.data[0].phone,
                        Gender: response.data[0].Gender,

                        Hobbies: response.data[0].Hobbies,

                        Message: response.data[0].Message,
                        // image: response.data[0].image,

                        // image:response.querySelector('#image').files[0]
                    })

                    // console.log("jvuegheb",data)

                })
                .catch(err => {
                    console.log("error has occured" + err)
                })
        }

    }, []);

    // console.log(data)
    // console.log("nvenvhebhe", data.image.name)
    console.log("hobbies",data.Hobbies)
    console.log("errrrrrrrrrrr", errorMessage.fname)
    return (
        <div encType="multipart/form-data" className='container'>
            <h1>Get In Touch</h1>
            <label>First Name</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text"
                id='fname'
                onChange={(e) => update(e)}
                name="fname" value={data.fname}
                placeholder="Enter First name"
                className="fname" />
                
            {(errorMessage.fname !== "" ) ? <div className="error"> * {errorMessage.fname} </div> : ""}
        { console.log("jjjjjjjjjl",errorMessage.fname)}
           
            <br></br>
            <label>Last Name</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text"
                onChange={(e) => update(e)}
                name="lname"
                value={data.lname}
                placeholder="Enter Last name"
                className="lname" />
            {errorMessage.lname && <div className="error"> * {errorMessage.lname} </div>}


            <br></br>
            <label>Email Address</label>
            <input type="email"
                onChange={(e) => update(e)}
                name="email"
                value={data.email}
                placeholder="Enter email"
                className="email" />
            {errorMessage.email && <div className="error"> * {errorMessage.email} </div>}

            <br></br>
            <label>Phone number</label>
            <input type="text"
                onChange={(e) => update(e)}
                name="phone" value={data.phone}
                placeholder="Enter phone number"
                className="num" /><br /><br />
            {errorMessage.phone && <div className="error"> * {errorMessage.phone} </div>}

            <label className='selectGender'
                id="myForm">Gender:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio"
                onChange={handleChange}
                name="Gender"
                value="male"
                id="male"
                checked={data.Gender === 'male'}
            /> Male
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio"
                onChange={handleChange}
                name="Gender"
                value="female"
                id="female"
                checked={data.Gender === 'female'}
            /> Female
            <br /><br />
            {errorMessage.Gender && <div className="error"> * {errorMessage.Gender} </div>}

            <label className='Hobbies' name="Hobbies" value={data.Hobbies}>Hobbies:</label>
            <input type="checkbox"
                onChange={changeHandle}
                name="reading"
                value="reading"
                // onClick="this.checked=!this.checked"
                checked={(data.Hobbies).includes("reading")} />Reading

            <input type="checkbox"
                onChange={changeHandle}
                name="playing"
                value="playing"
                // onClick="this.checked=!this.checked"

                checked={(data.Hobbies).includes("playing")} />Playing

            <input type="checkbox"
                onChange={changeHandle}
                name="programming"
                value="programming"
                // onClick="this.checked=!this.checked;"

                checked={(data.Hobbies).includes("programming")} />programming<br />
            {errorMessage.Hobbies && <div className="error">  {errorMessage.Hobbies} </div>}

            <br></br>

            <label>Message</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <textarea type="Message"
                cols="50"
                onChange={(e) => update(e)}
                name="Message" value={data.Message}
                placeholder="Type your Message here"
                className="msg"></textarea>
            {errorMessage.Message && <div className="error"> * {errorMessage.Message} </div>}

            <br></br>
            <label>Image</label>
            <input type="file"
                className="image" onChange={(e) => update(e)}
                name="image"
                id="image"
                value={data.image} /> <br />


            <button type="button" onClick={(e) => submit(e)} className="sub">Submit</button>
            <h1>click <a href='/DetailsContact'>here</a> to go contact details Page.</h1>

            <div className="App">
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                    name="image"
                    id="image"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps
                    }) => (
                        <div className="upload__image-wrapper">
                            <button className="sub"
                                style={isDragging ? { color: "red" } : null}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Click or Drop here
                            </button>
                            &nbsp;
                            <button className="sub" onClick={onImageRemoveAll}>Remove all images</button>
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image.data_url} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                        <button className="sub" onClick={() => onImageUpdate(index)}>Update</button>
                                        <button className="sub" onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
            </div>

        </div>
    )

}