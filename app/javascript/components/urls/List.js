import React, { useState, useEffect } from "react";

import Header from "../shared/Header";
import Pin from "./Pin";

const List = () => {
  const [urls, setUrls] = useState([]);
  const [categories, setCategories] = useState([]);
  const [clicks, setClicks] = useState([]);

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

  useEffect(() => {
    fetch(`/api/v1/urls`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
    })
      .then((res) => res.json())
      .then((res) => setUrls(res.urls));
  }, []);

  useEffect(() => {
    fetch(`/api/v1/clicks`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
    })
      .then((res) => res.json())
      .then((res) => setClicks(res.clicks_with_url_id));
  }, []);

  const handleClick = (slug, is_pinned) => {
    fetch(`/api/v1/urls/${slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify({
        url: {
          slug: slug,
          is_pinned: !is_pinned,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => setUrls(res.urls));
  };

  const handleRedirect = (url_id, slug) => {
    fetch(`/api/v1/urls/${slug}`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
    })
      .then((res) => res.json())
      .then((res) => window.open(res.original, "_blank"))
      .then(
        fetch(`/api/v1/clicks/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]')
              .content,
          },
          body: JSON.stringify({
            click: {
              url_id: url_id,
            },
          }),
        })
          .then((res) => res.json())
          .then((res) => setClicks(res.clicks_with_url_id))
      );
  };

  const updateCategory = (e, slug) => {
    fetch(`/api/v1/urls/${slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify({
        url: {
          category_id: e.target.value,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => setUrls(res.urls));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>List Of Shortened URLs</h1>
          </div>
          <div className="col-5">
            <Header />
          </div>
        </div>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Original URL</th>
              <th scope="col">Visits</th>
              <th scope="col">Category</th>
              <th scope="col">Short URL</th>
            </tr>
          </thead>
          { urls && urls.map((url) => {
            const shorted_url = `https://short.is/${url.slug}`;
            return (
              <>
                <tbody key={url.id}>
                  <tr>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick(url.slug, url.is_pinned)}
                    >
                      <Pin isPinned={url.is_pinned} />
                    </td>
                    <td className="col">
                      <a href={url.original} target="_blank">
                        {url.original}
                      </a>
                    </td>
                    <td className="col">
                      {clicks && clicks[url.id] ? (
                        <div>{clicks[url.id].length}</div>
                      ) : (
                        <div>0</div>
                      )}
                    </td>
                    <td className="col">
                      <div className="form-group">
                        <select
                          className="form-control"
                          id="sel1"
                          style={{ width: "auto" }}
                          onChange={(e) => updateCategory(e, url.slug)}
                          value={categories ? url.category_id : "default"}
                        >
                          <option value="default">Select</option>
                          {categories.map((category) => {
                            return (
                              <>
                                <option key={category.id} value={category.id}>
                                  {category.title}
                                </option>
                              </>
                            );
                          })}
                        </select>
                      </div>
                    </td>
                    <td className="col">
                      <a
                        onClick={() => handleRedirect(url.id, url.slug)}
                        target="_blank"
                      >
                        {shorted_url}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default List;
