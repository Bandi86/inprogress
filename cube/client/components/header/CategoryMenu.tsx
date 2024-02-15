import Link from 'next/link'

const CategoryMenu = () => {
  const cat = ['netflix', 'hbo', 'nvidia']

  return (
    <div className='bg-[#24252f] h-12 flex justify-center p-2 gap-6 items-center text-white'>
      {cat.map(c => (
        <div key={c}>
          <Link href={`/${c}`}>
            <div className='border border-2-slate p-4'>{c}</div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CategoryMenu
