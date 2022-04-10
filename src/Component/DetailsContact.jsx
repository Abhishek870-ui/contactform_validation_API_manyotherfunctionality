import React, { useEffect, useState } from 'react'
import "./css/style.css"
import Pagination from './Pagination';
import Axios from "axios";
import { useLocation, Link, useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


const DetailsContact = () => {

  let [detailsContact, setDetailsContact] = useState([]);
  const [spinner, setSpinner] = useState(false);
  let [records, setRecords] = useState([]);
  const [limit, setLimit] = useState(5);
  const [pageNo, setPageNo] = useState(1);

  // const [offset, setOffset] = useState(0);

  // API call to fetch data

  const fetchData = (pageNos) => {
    setSpinner(true);

    Axios.post(`http://localhost:8080/fetch/contactDetailsbypagination`, {
      "offset": (pageNos - 1) * limit,
      "limit": limit
    })
      .then((response) => {

        console.log(response.data)
        setDetailsContact(response.data)
        setSpinner(false);
      })
      .catch(err => {
        console.log("error has occured" + err)
      })

  }

  const totalRecords = () => {
    Axios.get(`http://localhost:8080/fetch/totalrecords`)
      .then((response) => {
        setRecords(response.data)
      })
      .catch(err => {
        console.log("error has occured" + err)
      })

  }
  useEffect(() => {
    fetchData(pageNo)
    totalRecords()
  }, [])



  const getPageData = (pageNo) => {
    setPageNo(pageNo)
    fetchData(pageNo)
    console.log(pageNo, "pageNo")
  }


  function submit(e) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="alert">
            <h1 className="alert__title">Are you sure?</h1>
            <p className="alert__body">You want to delete this file?</p>
            <button onClick={onClose} className="alert__btn alert__btn--no">No</button>
            <button
              onClick={() => {
                handleClickDelete(e);
                onClose();
              }}
              className="alert__btn alert__btn--yes"
            >
              Yes, Delete it!
            </button>
          </div>
        );
      }
    });

  }
  function handleClickDelete(e) {
    window.location.reload();

    console.log("id is", e.target.id)
    let id = e.target.id
    Axios.post("http://localhost:8080/delete/deletecontact/" + id).then(res => {
      console.log("delete data: ", res.data)
      alert("data delete successfully")
    })

      .catch(err => {
        console.log("error has occured while deleting member : " + err)
      })

  }


  return (
    <div className='row' >
      <div className="col" id='contactdetails'>
        <h1>Contact Page details</h1>

        <div className="current-page">
          {spinner === true ? <h2><i className="fa fa-spinner fa-pulse  fa-fw"></i>Please wait data Loading ...</h2> :
            <table className="table table-striped table-light">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Hobbies</th>
                  <th scope="col">Message</th>
                  <th scope="col">Image</th>

                  <th>Action</th>
                </tr>
              </thead>
              {detailsContact.map((e, i) => {
                return (
                  <tbody key={i}>

                    <tr>
                      <td >{i + 1}</td>
                      <td>{e.full_name}</td>
                      <td>{e.email}</td>
                      <td>{e.phone}</td>
                      <td>{e.gender}</td>
                      <td>{e.hobbies}</td>
                      <td>{e.message}</td>
                      <td><img src={`${e.image}`}></img> </td>

                      <td>
                        <Link
                          to={{
                            pathname: `/contact-edit/${e.id}`,
                            state: { users: e }
                          }}
                        >
                          <button>Edit</button>
                        </Link>
                        <button id={e.id} onClick={(e) => submit(e)}>Delete</button>
                      </td>
                    </tr>
                  </tbody>
                )

              })}

            </table>
          }
        </div>
        <div className="pagination-wrapper">

          <Pagination
            totalRecords={records.length}
            limit={limit}
            pageNo={pageNo}
            getPageData={getPageData}
          />

        </div>

        <h1>Go to add contact details click <a href='/contact'>HERE</a></h1>
      </div>


    </div>
  )

}
export default DetailsContact;