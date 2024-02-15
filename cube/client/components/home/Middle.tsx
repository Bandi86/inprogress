import OnePostPreview from '../OnePostPreview'

const Middle = () => {
  return (
    <div className='w-full min-h-min p-4 mt-4 flex flex-row justify-center items-center border-2 border-slate-200'>
      <h1>Middle Section</h1>
      <div className='w-1/5'>Legtobb 5 komment cikk</div>
      <div className='w-3/5'>
        <OnePostPreview />
      </div>
      <div className='w-1/5'>5 legjobb cikk a heten</div>
    </div>
  )
}

export default Middle
