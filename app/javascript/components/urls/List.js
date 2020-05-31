import React, { useState } from "react"
import Pin from "./Pin"

const List = (props) => {
  const [urls, setUrls] = useState(props.urls)
  const [categories] = useState(props.categories)
  console.log(urls)
  console.log(categories)

  const handleClick = (slug, is_pinned) => {
    fetch(`/urls/${slug}`, {
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
    fetch(`/urls/${slug}`, {
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
          <h1 className="text-center" >List Of Shortened URLs</h1>
          <a>Manage Categories</a>
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
                <tbody>
                  <tr>
                    <td style={{ cursor: 'pointer' }} onClick={() => handleClick(url.slug, url.is_pinned)}>
                      <Pin isPinned={url.is_pinned} />
                    </td>
                    <td className="col">
                      <a href={url.original} target="_blank" >{url.original}</a>
                    </td>
                    <td className="col">
                      <div>
                        <select onChange={(e) => updateCategory(e, url.slug)} value={categories ? url.category_id : "default"}>
                          <option value="default">
                            Select
                            </option>
                          {categories.map((category) => {
                            return (
                              <>
                                <option value={category.id}>
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
