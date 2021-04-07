import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from 'prop-types';

import Footer from "../components/Footer";
import TopNavbar from "../components/TopNavbar";


// Import Styles = bootstrap + custom
import "../styles/style.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

// Layout component: add header + footer + TOC to content
export default function Layout({ children, title, seoDescription, keywords }) {

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto|Montserrat"
          rel="stylesheet"
        />
        <meta name="description" content={seoDescription || 'Le calculateur de rentabilité immobilière'} />
        <meta name="author" content="Yan Holtz" />
        <meta name="keywords" content={keywords || 'Immobilier, Location, Rentabilité, Calculateur, Taux, Prêt, Gestion Locative, Fiscalité'} />

        <meta property="og:site_name" content="Immo Renta" />
        <meta property="og:title" content={title + " | Immo Renta"} />
        <meta property="og:image" content="https://github.com/holtzy/The-Python-Graph-Gallery/blob/master/static/overview_PGG.png?raw=true" />
        <meta property="og:description" content={seoDescription} />
        <meta name="twitter:image" content="https://github.com/holtzy/The-Python-Graph-Gallery/blob/master/static/overview_PGG.png?raw=true" />
      </Helmet>

      <header>
        <TopNavbar />
      </header>

      <main id="mainContainer">{children}</main>

      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  chartType: PropTypes.string,
  seoDescription: PropTypes.string,
  keywords: PropTypes.string
};
