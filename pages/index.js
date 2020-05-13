import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

/*
ビルド時にこの関数を実行して得られたpropsをHomeコンポーネントに渡して、htmlを事前に生成(pre-rendering)する
ビルド時にpre-rendering == 静的生成(ssg: static site generater)
1.必ずサーバーサイドで実行される。(当然、ブラウザ用の JS バンドルに含まれることもない)
2.開発環境 --> リクエストごとに実行 / 本番環境 --> ビルド時に実行
3. 1,2より --> フロントの情報(クエリパラメータやHTTPヘッダなど)を使用することはできない。
4. pageのみからexportできる

※ユーザーのリクエストに先立ってページをプレレンダリングできない場合は、ssgを選択すべきではない
.eg)
  - 頻繁に更新されるデータを表示するページ
  - ページの内容が毎回のリクエストで変化するようなページ
このようなケースではssrするかプリレンダリングをスキップする
*/
export async function getStaticProps() {
  // TODO: この中でdebuggerで止めるためにはどうしたら良い?
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}