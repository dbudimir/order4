import Document, { Head, Main, NextScript } from 'next/document';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    const bodyStyle = {
      margin: 0
    };

    return (
      <html>
        <Head>
          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KGFF5HN');`
            }}
          ></script>
          {/* End Google Tag Manager */}

          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}
        </Head>

        <body style={bodyStyle}>
          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: (
                <iframe
                  src="https://www.googletagmanager.com/ns.html?id=GTM-KGFF5HN"
                  height="0"
                  width="0"
                  style="display:none;visibility:hidden"
                ></iframe>
              )
            }}
          ></script>
          {/* End Google Tag Manager */}

          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
