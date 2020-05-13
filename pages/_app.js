import '../styles/global.css'

//NOTE: globalに反映させたいcssは_app.jsで読み込む

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}