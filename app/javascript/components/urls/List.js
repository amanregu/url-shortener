import React from "react"
import PropTypes from "prop-types"

const List = ({ urls }) => {
  return (
    <>
      <h1 className="text-center" >URL List</h1>
      <div className="container" >
        <table className="table">
          {urls.map((url) => {
            const shorted_url = `https://short.is/${url.slug}`
            return (
              <>
                <tbody>
                  <tr>
                    <td >
                      <button>
                        <svg className="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clipRule="evenodd" />
                        </svg>
                      </button>
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
