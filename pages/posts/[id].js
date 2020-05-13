import Layout from '../../components/layout'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

// getStaticPropsと同じようにビルド時に実行される
// 開発環境では毎回のリクエストで実行される
// fallback が false であれば、getStaticPaths から return されていないあらゆるパスは、アクセスすると 404 ページ となる
// fallbackに関する詳細 --> https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

// TODO: 確認 ここはparamsという名前で受け取るルールがある?
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}