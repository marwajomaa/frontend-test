import React from "react";
import { Link } from "react-router-dom";
const data = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "about",
    url: "/about/",
  },
  {
    id: 3,
    text: "features",
    url: "/features/",
  },
  {
    id: 4,
    text: "blogs",
    url: "/blogs/",
  },
  {
    id: 5,
    text: "contact",
    url: "/contact/",
  },
];

const tempLinks = data.map((link) => {
  return (
    <li key={link.id}>
      <Link to={link.url}>{link.text}</Link>
    </li>
  );
});

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ styleClass }) => {
  return <ul className={`page-links ${styleClass || ""}`}>{tempLinks}</ul>;
};
