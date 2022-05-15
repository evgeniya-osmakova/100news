import { globalCss, styled } from '@stitches/react';

export const globalStyles = globalCss({
  "html, body, #root": {
    height: "100%",
    width: "100%",
    margin: 0,
    padding: 0,
    fontFamily: "'Open Sans', sans-serif",
  },
  "main": {
    height: "100%",
    width: "100%",
  },
  "h1, h2, h3, h4, h5, h6, p": {
    margin: 0,
    padding: 0,
    verticalAlign: "baseline",
    lineHeight: "150%",
    fontFamily: "'Open Sans', sans-serif",
  },
  "h1": {
    fontSize: "2rem",
    fontWeight: 700,
  },
  "h2": {
    fontSize: "1.7rem",
    fontWeight: 700,
  },
  "h3": {
    fontSize: "1.5rem",
    fontWeight: 700,
  },
  "h4": {
    fontSize: "1.3rem",
    fontWeight: 700,
  },
  "h5": {
    fontSize: "1.2rem",
    fontWeight: 700,
  },
  "h6": {
    fontSize: "1rem",
    fontWeight: 700,
  },
  "button": {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.9",
      boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%)",
      transition: "opacity 0.2s ease, boxShadow 0.2s ease",
    },
    "&:active": {
      boxShadow :"0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
    }
  },
  "a": {
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.7",
      transition: "opacity 0.2s ease",
    },
    "&:active": {
      opacity: "1",
      transition: "opacity 0.2s ease",
    },
    "&:visited": {

    }
  }
});

export const Container = styled('div', {
  display: "flex",
  variants: {
    direction: {
      vertical: {
        flexDirection: "column",
        justifyContent: "center",
      },
      row: {
        flexDirection: "row",
        alignItems: "center",
      },
    },
    content: {
      center: {
        justifyContent: "center",
      },
      end: {
        justifyContent: "flex-end",
      },
      start: {
        justifyContent: "flex-start",
      },
      between: {
        justifyContent: "space-between",
      }
    },
    align:  {
      center: {
        alignItems: "center",
      },
      end: {
        alignItems: "flex-end",
      },
      start: {
        alignItems: "flex-start",
      },
      baseline: {
        alignItems: "baseline",
      }
    },
  },
  defaultVariants: {
    direction: 'row',
  }
});
