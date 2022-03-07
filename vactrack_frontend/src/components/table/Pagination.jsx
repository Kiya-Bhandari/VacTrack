import React from "react";
import { usePagination } from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  nav: {
    marginLeft: "auto",
    marginBottom: 3,
  },
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
  },
  li: {
    paddingRight: 2,
  },
  button: {
    border: 1,
    borderRadius: 3,
    background: "#ffffff",
    minWidth: 30,
    minHeight: 30,
  },
});

export default function Pagination({ numberOfPages, onPaginationClicked }) {
  // const handleChange = (item) => {
  //   console.log("tt");
  // };
  const classes = useStyles();
  const { items } = usePagination({
    count: numberOfPages,
    defaultPage: 1,
    // renderItem: { handleChange },
  });

  return (
    <nav className={classes.nav}>
      <ul className={classes.ul}>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                type="button"
                style={{
                  color: selected ? "#ffffff" : undefined,
                  background: selected ? "#0397d6" : undefined,
                }}
                className={classes.button}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button className={classes.button} type="button" {...item}>
                {type}
              </button>
            );
          }

          return (
            <li
              className={classes.li}
              key={index}
              onClick={() => onPaginationClicked(page)}
            >
              {children}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
