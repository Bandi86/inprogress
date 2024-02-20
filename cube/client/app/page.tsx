import Middle from '@/components/home/Middle'
import NewPostSection from '@/components/home/NewPostSection'

export default function Home() {
  return (
    <main>
      <h1>Trending</h1>
      <section>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Nostrum consequuntur necessitatibus nobis. Omnis modi
        blanditiis harum. Mollitia, earum tempora harum dolor nihil
        minus corporis quo, nulla quaerat nemo pariatur dignissimos!
      </section>
      <h1>New Posts</h1>
      <section>
        <NewPostSection />
        <Middle />
      </section>
    </main>
  )
}
