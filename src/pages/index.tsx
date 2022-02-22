/* eslint-disable @next/next/no-img-element */
import  Head  from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
//import Image from 'next/image'
import styles from  './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | IG.News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome!</span>
          <h1>News about the <br/> <span>React</span> world</h1>
          <p>
            Get access to all the publications <br/>
            <span>for $9.90 month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  )
}
