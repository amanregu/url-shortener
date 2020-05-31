import React, { useState } from 'react'
import { NavLink, BrowserRouter as Router } from 'react-router-dom'

const Card = (props) => {
  const [categories, setCategories] = useState(props.categories)
  const [title, setTitle] = useState();
  const [modalStatus, setModalStatus] = useState(false)
  const [currentId, setCurrentId] = useState();
  const [currentCategory, setCurrentCategory] = useState();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(`/categories/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content
      },
      body: JSON.stringify({
        "title": title
      })
    }).then(res => res.json()).then(res => setCategories(res.categories)).then(setTitle(""))
  }

  const handleDelete = (id) => {
    fetch(`categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content
      },
    }).then(res => res.json()).then(res => setCategories(res.categories))
  }

  const handleEdit = (id, title) => {
    setCurrentId(id)
    setCurrentCategory(title)
    setModalStatus(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`/categories/${currentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content
      },
      body: JSON.stringify({
        "title": currentCategory
      })
    }).then(res => res.json()).then(res => setCategories(res.categories)).then(setModalStatus(false))
  }

  return (
    <>
      <div>
        {modalStatus ? (
          <div>
            <div className="modal-dialog modal-dialog-centered" role="document" >
              <div className="modal-content">
                <div className="modal-body" >
                  <form onSubmit={(e) => handleSubmit(e)} >
                    <div className="d-flex flex-row justify-content-between">
                      <label>
                        <input className="form-control" type="text" value={currentCategory} onChange={e => setCurrentCategory(e.target.value)} name="title" />
                      </label>
                      <input className="btn btn-success" type="submit" value="Update" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>) : (<div></div>)}
        <div className="form-container text-center">
          <form onSubmit={(e) => submitForm(e)} >
            <label>
              <input className="form-control" type="text" value={title} onChange={e => setTitle(e.target.value)} name="title" placeholder="e.g Education" />
            </label>
            <input className="btn btn-success" type="submit" value="Create New Category" ></input>
          </form>
        </div>
        <div className="container" >
          <div className="d-flex flex-row justify-content-between" >
            <h1 >List of Categories</h1>
              <NavLink to="/">
                <h2 style={{ cursor: 'pointer' }} >Manage URLs</h2>
              </NavLink>
          </div>
          <table className="table table-bordered">
            <thead className="thead-dark" >
              <tr>
                <th scope="col">Category Title</th>
                <th scope="col">#</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            {categories.map((category) => {
              return (
                <>
                  <tbody>
                    <tr>
                      <td className="col">
                        <h4>{category.title}</h4>
                      </td>
                      <td className="col">
                        <a onClick={() => handleEdit(category.id, category.title)} >Edit</a>
                      </td>
                      <td className="col">
                        <a onClick={() => handleDelete(category.id)} >Delete</a>
                      </td>
                    </tr>
                  </tbody>
                </>
              )
            })}
          </table>
        </div>
      </div>
    </>
  )
}

export default Card;