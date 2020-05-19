import React, { useState } from "react"
import PropTypes from "prop-types"

const List = ( props ) => {
  const [urls, setUrls] = useState(props.urls)

  const handleClick = (slug, is_pinned) => {
    fetch("/urls/update/", {
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
      <h1 className="text-center" >URL List</h1>
      <div className="container" >
        <table className="table">
          {urls.map((url) => {
            console.log(url.is_pinned)
            const shorted_url = `https://short.is/${url.slug}`
            return (
              <>
                <tbody>
                  <tr>
                    <td >
                      <svg onClick={() => handleClick(url.slug, url.is_pinned)}
                        className={url.is_pinned ? ("bi bi-circle-fill") : ("bi bi-circle")} width="1em" height="1em" viewBox="0 0 16 16"
                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        {url.is_pinned ? (<circle cx="8" cy="8" r="8" />) :
                          (<path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clipRule="evenodd" />)}
                      </svg>
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
