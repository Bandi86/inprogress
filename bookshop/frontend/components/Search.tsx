

const SearchBar = () => {
  return (
    <div className='flex justify-center items-center'>
      <input
        type='text'
        placeholder='Search..'
        name='search'
        className='rounded-md h-10 w-[20rem] text-black px-2'
      />
    </div>
  )
}

export default SearchBar
