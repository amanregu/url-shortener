import React, { useState } from 'react'

const Card = (props) => {
  const [categories, setCategories] = useState(props.categories)
  const [title, setTitle] = useState();

  const submitForm = () => {
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

  const handleSumbit = (e) => {
    e.preventDefault();
    submitForm()
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

  return (
    <>
      <div>
        <div className="form-container text-center">
          <form onSubmit={(e) => handleSumbit(e)} >
            <label>
              <input className="form-control" type="text" value={title} onChange={e => setTitle(e.target.value)} name="title" placeholder="e.g Education" />
            </label>
            <input className="btn btn-success" type="submit" value="Create New Category" ></input>
          </form>
        </div>
        <div className="container" >
          <div className="d-flex flex-row justify-content-between" >
            <h1 >List of Categories</h1>
            <h2 style={{ cursor: 'pointer' }} >Manage URLs</h2>
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
                        <a>Edit</a>
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