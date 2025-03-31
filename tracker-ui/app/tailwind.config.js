/** @type {import('tailwindcss').Config} */
module.exports = {
    "content": [
          "./pages/**/*.{js,ts,jsx,tsx}",
          "./components/**/*.{js,ts,jsx,tsx}"
    ],
    "theme": {
          "extend": {
                "colors": {
                      "background-warning-tertiary": "#fffbeb",
                      "background-default-default": "#fff",
                      "border-default-default": "#d9d9d9",
                      "black-200": "rgba(12, 12, 13, 0.1)",
                      "black-100": "rgba(12, 12, 13, 0.05)",
                      "text-default-secondary": "#757575",
                      "text-default-default": "#1e1e1e",
                      "background-brand-default": "#2c2c2c",
                      "text-brand-on-brand": "#f5f5f5",
                      "text-neutral-default": "#303030",
                      "black": "#000",
                      "gray": "#777"
                },
                "spacing": {
                      "depth-0": "0px",
                      "depth-100": "4px",
                      "depth-negative-025": "-1px",
                      "space-300": "12px",
                      "space-400": "16px",
                      "space-100": "6.5px",
                      "padding-lg": "16px",
                      "padding-sm": "8px",
                      "space-200": "8px"
                },
                "fontFamily": {
                      "body-small": "Inter"
                },
                "borderRadius": {
                      "radius-200": "8px",
                      "smi": "13px",
                      "lg-7": "18.7px",
                      "lgi-5": "19.5px",
                      "lg-2": "18.2px"
                },
                "borderWidth": {
                      "stroke-border": "1px"
                },
                "padding": {
                      "smi": "13px",
                      "lgi-5": "19.5px",
                      "7xl": "26px",
                      "6xs-5": "6.5px"
                }
          },
          "fontWeight": {
                "body-font-weight-regular": "400",
                "body-font-weight-strong": "600",
                "heading-font-weight": "600"
          },
          "fontSize": {
                "body-size-small": "14px",
                "body-size-medium": "16px",
                "heading-size-base": "24px",
                "sm": "14px",
                "base": "16px",
                "5xl": "24px",
                "3xl-7": "22.7px",
                "7xl": "26px",
                "inherit": "inherit"
          }
    },
    "corePlugins": {
          "preflight": false
    }
}