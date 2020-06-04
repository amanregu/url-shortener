import React, { useState, useEffect } from "react";

import Header from "../shared/Header";

const Card = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState();
  const [modalStatus, setModalStatus] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [currentCategory, setCurrentCategory] = useState();

  useEffect(() => {
    fetch(`/api/v1/categories`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
    })
      .then((res) => res.json())
      .then((res) => setCategories(res.categories));
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    fetch(`/api/v1/categories/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify({
        title: title,
      }),
    })
      .then((res) => res.json())
      .then((res) => setCategories(res.categories))
      .then(setTitle(""));
  };

  const handleDelete = (id) => {
    fetch(`/api/v1/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
    })
      .then((res) => res.json())
      .then((res) => setCategories(res.categories));
  };

  const handleEdit = (id, title) => {
    setCurrentId(id);
    setCurrentCategory(title);
    setModalStatus(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/v1/categories/${currentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify({
        title: currentCategory,
      }),
    })
      .then((res) => res.json())
      .then((res) => setCategories(res.categories))
      .then(setModalStatus(false));
  };

  return (
    <>
      <div>
        {modalStatus ? (
          <div>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="d-flex flex-row justify-content-between">
                      <label>
                        <input
                          className="form-control"
                          type="text"
                          value={currentCategory}
                          onChange={(e) => setCurrentCategory(e.target.value)}
                          name="title"
                        />
                      </label>
                      <input
                        style={{ width: "100px" }}
                        className="btn btn-danger btn-sm"
                        onClick={() => setModalStatus(false)}
                        value="Cancel"
                      />
                      <input
                        className="btn btn-success"
                        type="submit"
                        value="Update"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>List of Categories</h1>
            </div>
            <div className="col-5">
              <Header />
            </div>
          </div>
          <table className="table table-bordered">
            <thead className="thead-dark">
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
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleEdit(category.id, category.title)
                          }
                        >
                          Edit
                        </a>
                      </td>
                      <td className="col">
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(category.id)}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>
        </div>
      </div>
      <div className="form-container text-center">
          <form onSubmit={(e) => submitForm(e)}>
            <label>
              <input
                className="form-control"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                placeholder="e.g Education"
              />
            </label>
            <input
              className="btn btn-success"
              type="submit"
              value="Create New Category"
            ></input>
          </form>
        </div>
    </>
  );
};

export default Card;
