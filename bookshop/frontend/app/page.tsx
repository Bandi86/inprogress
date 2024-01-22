import RenderBook from '@/components/RenderBook'
import RightMenu from '@/components/Sheet'

export default function Home() {
  return (
    <section className='h-min-screen'>
      <div className='flex justify-center'>
        <div className='w-1/8 border p-4'>{/* Left section */}</div>
        <div className='w-6/8 border p-4'>
          {/* Middle section */}

          <div className=''>
            <RenderBook options={{ title: 'latest books' }} />
            <RenderBook options={{ title: 'hot deals' }} />
          </div>
        </div>
        <div className='w-1/8 border p-4'>{/* Right section */}</div>
      </div>      
    </section>
  )
}
