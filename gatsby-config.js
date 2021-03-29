module.exports = {
    plugins: [
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                // You can add multiple tracking ids and a pageview event will be fired for all of them.
                trackingIds: [
                    "UA-79254642-2", // Google Analytics / GA
                ],
                // This object gets passed directly to the gtag config command
                // This config will be shared across all trackingIds
                gtagConfig: {
                    anonymize_ip: false,
                },
                // This object is used for configuration specific to this plugin
                pluginConfig: {
                    // Puts tracking script in the head instead of the body
                    head: true,
                },
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-less`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Immo Renta`,
                short_name: `Immo Renta`,
                start_url: `/`,
                background_color: `#f7f0eb`,
                theme_color: `#69b3a2`,
                display: `standalone`,
                icon: `static/logo/Home_single_big.png`
            },
        }
    ]
}
