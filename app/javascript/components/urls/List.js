import React, { useState } from "react"
import Pin from "./Pin"

const List = (props) => {
  const [urls, setUrls] = useState(props.urls)

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
  return (
    <>
      <h1 className="text-center" >List Of Shorted URLs</h1>
      <div className="container" >
        <table className="table">
          {urls.map((url) => {
            const shorted_url = `https://short.is/${url.slug}`
            return (
              <>
                <tbody>
                  <tr>
                    <td onClick={() => handleClick(url.slug, url.is_pinned)}>
                      <Pin isPinned={url.is_pinned} />
                    </td>
                    <td className="col">
                      <a href={url.original} target="_blank" >{url.original}</a>
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
