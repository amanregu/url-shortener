import React, { useState, useEffect } from "react"
import { NavLink, BrowserRouter as Router } from "react-router-dom"

import Pin from "./Pin"

const List = (props) => {
  const [urls, setUrls] = useState(props.urls)
  const [categories, setCategories] = useState([])
  console.log(props)
  console.log(categories)

  useEffect(() => {
    fetch(`/api/v1/categories`, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content
      }
    }).then(res => res.json()).then(res => setCategories(res.categories))
  }, [])

  const handleClick = (slug, is_pinned) => {
    fetch(`/api/v1/urls/${slug}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content
      },
      body: JSON.stringify({
        "url": {
          slug: slug,
          is_pinned: !is_pinned
        }
      })
    }).then(res => res.json()).then(res => setUrls(res.urls))
  }

  const updateCategory = (e, slug) => {
    fetch(`/api/v1/urls/${slug}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content
      },
      body: JSON.stringify({
        "url": {
          category_id: e.target.value
        }
      })
    }).then(res => res.json()).then(res => setUrls(res.urls))
  }

  return (
    <>
      <div className="container" >
        <div className="d-flex flex-row justify-content-between" >
          <h1 >List Of Shortened URLs</h1>
          <NavLink to="/categories">
            <h2>Mange Categories</h2>
          </NavLink>
        </div>
        <table className="table table-bordered">
          <thead className="thead-dark" >
            <tr>
              <th scope="col">#</th>
              <th scope="col">Original URL</th>
              <th scope="col">Category</th>
              <th scope="col">Short URL</th>
            </tr>
          </thead>
          {urls.map((url) => {
            const shorted_url = `https://short.is/${url.slug}`
            return (
              <>
                <tbody key={url.id}>
                  <tr>
                    <td style={{ cursor: 'pointer' }} onClick={() => handleClick(url.slug, url.is_pinned)}>
                      <Pin isPinned={url.is_pinned} />
                    </td>
                    <td className="col">
                      <a href={url.original} target="_blank" >{url.original}</a>
                    </td>
                    <td className="col">
                      <div className="form-group" >
                        <select className="form-control" id="sel1" style={{width: "auto"}} onChange={(e) => updateCategory(e, url.slug)} value={categories ? url.category_id : "default"}>
                          <option value="default">
                            Select
                            </option>
                          {categories.map((category) => {
                            return (
                              <>
                                <option key={category.id} value={category.id}>
                                  {category.title}
                                </option>
                              </>
                            )
                          })}
                        </select>
                      </div>
                    </td>
                    <td className="col">
                      <a href={shorted_url} target="_blank" >{shorted_url}</a>
                    </td>
                  </tr>
                </tbody>
              </>
            )
          })}
        </table>
      </div>
    </>
  )
}

export default List
