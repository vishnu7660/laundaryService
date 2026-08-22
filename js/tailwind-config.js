/* ============================================================
   PureWash Laundry Service - Tailwind Configuration
   Author : PureWash Team
   Folder : js/tailwind-config.js
   Note   : This file extends the Tailwind CDN theme with the
            brand colours, fonts, spacing and type scale used
            across the whole project. Edit it once and every
            page picks up the new design tokens.
   ============================================================ */

tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            /* --------------------------------------------------
               Brand Colour Palette (Material 3 inspired)
               -------------------------------------------------- */
            colors: {
                // Primary - deep navy (headers, buttons, headings)
                "primary": "#001a48",
                "on-primary": "#ffffff",
                "primary-container": "#002d72",
                "on-primary-container": "#7a97e2",
                "primary-fixed": "#dae2ff",
                "primary-fixed-dim": "#b1c5ff",
                "on-primary-fixed": "#001946",
                "on-primary-fixed-variant": "#224489",

                // Secondary - sky blue (accents, links, highlights)
                "secondary": "#00639c",
                "on-secondary": "#ffffff",
                "secondary-container": "#58b1fd",
                "on-secondary-container": "#00426c",
                "secondary-fixed": "#cfe5ff",
                "secondary-fixed-dim": "#98cbff",
                "on-secondary-fixed": "#001d33",
                "on-secondary-fixed-variant": "#004a77",

                // Tertiary - slate
                "tertiary": "#111e26",
                "on-tertiary": "#ffffff",
                "tertiary-container": "#26333b",
                "on-tertiary-container": "#8d9ba5",
                "tertiary-fixed": "#d6e4ef",
                "tertiary-fixed-dim": "#bac8d3",
                "on-tertiary-fixed": "#101d25",
                "on-tertiary-fixed-variant": "#3b4851",

                // Surfaces - neutral backgrounds
                "background": "#f7f9fb",
                "on-background": "#191c1e",
                "surface": "#f7f9fb",
                "on-surface": "#191c1e",
                "surface-dim": "#d8dadc",
                "surface-bright": "#f7f9fb",
                "surface-container-lowest": "#ffffff",
                "surface-container-low": "#f2f4f6",
                "surface-container": "#eceef0",
                "surface-container-high": "#e6e8ea",
                "surface-container-highest": "#e0e3e5",
                "surface-variant": "#e0e3e5",
                "on-surface-variant": "#444651",
                "inverse-surface": "#2d3133",
                "inverse-on-surface": "#eff1f3",
                "inverse-primary": "#b1c5ff",
                "surface-tint": "#3d5ca2",

                // Outline / borders
                "outline": "#747782",
                "outline-variant": "#c4c6d2",

                // Error / success
                "error": "#ba1a1a",
                "on-error": "#ffffff",
                "error-container": "#ffdad6",
                "on-error-container": "#93000a",
                "success": "#2e7d32",
            },

            /* --------------------------------------------------
               Border Radius Scale
               -------------------------------------------------- */
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "3xl": "1.5rem",
                "full": "9999px",
            },

            /* --------------------------------------------------
               Custom Spacing Tokens
               -------------------------------------------------- */
            spacing: {
                "margin-desktop": "64px", // desktop side margin
                "margin-mobile": "16px",  // mobile side margin
                "container-max": "1200px", // max content width
                "gutter": "24px",          // grid gutter gap
                "unit": "4px",             // base spacing unit
            },

            /* --------------------------------------------------
               Font Families
               -------------------------------------------------- */
            fontFamily: {
                "display-lg": ["Plus Jakarta Sans"],
                "headline-lg": ["Plus Jakarta Sans"],
                "headline-lg-mobile": ["Plus Jakarta Sans"],
                "headline-md": ["Plus Jakarta Sans"],
                "body-lg": ["Manrope"],
                "body-md": ["Manrope"],
                "label-md": ["Manrope"],
            },

            /* --------------------------------------------------
               Type Scale (font sizes + line heights + weights)
               -------------------------------------------------- */
            fontSize: {
                "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "600" }],
                "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "700" }],
                "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
                "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
                "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
                "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "700" }],
                "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
            },
        },
    },
};

