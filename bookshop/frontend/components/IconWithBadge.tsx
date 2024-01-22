export type IconWithBadgeProps = {
  icon: React.ReactNode
  count: number
  onClick?: () => void
}

const IconWithBadge = ({ icon, count, onClick }: IconWithBadgeProps) => (
  <div className='relative inline-flex items-center space-x-5' onClick={onClick}>
    {icon}
    {[...Array(count)].map((_, index) => (
      <span key={index} className='flex absolute -mt-[3rem]'>
        <span className='absolute inline-flex h-6 w-6 rounded-full bg-pink-600 opacity-75'><span className="absolute ml-[0.4rem]">{count}</span></span>
        
      </span>
    ))}
  </div>
)

export default IconWithBadge
