import React from "react"
import PropTypes from "prop-types"

const List = ({ urls }) => {
  return (
    <>
      <h1>URL List</h1>
      <div className="table-container" >
        <table>
          {urls.map((url, index) => {
            return (
              <>
              <tr>
                <td style={ {display: "block"}} key={index} >
                    {url.original}
                  </td>
                  <td>
                    {url.slug}
                  </td>
              </tr>
              </>
            )
          })}
        </table>
      </div>
    </>
  )
}

export default List
