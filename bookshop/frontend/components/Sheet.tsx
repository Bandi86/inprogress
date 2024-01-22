import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { LuShoppingCart } from 'react-icons/lu'
import CartSheet from './CartSheet'
import FavoritesSheet from './FavoritesSheet'
import IconWithBadge from './IconWithBadge'

const RightMenu = () => {
  const [activeSheet, setActiveSheet] = useState<string | null>(null)

  const handleSheetOpen = (sheetType: string | null) => {
    setActiveSheet(sheetType)
  }

  const handleFavoritesClick = () => {
    handleSheetOpen('favorites')
  }

  const handleCartClick = () => {
    handleSheetOpen('cart')
  }

  return (
    <Sheet>
      <SheetTrigger>
        <div className='flex flex-row gap-10'>
          <IconWithBadge
            icon={<FaRegHeart className='h-8 w-8' />}
            count={2}
            onClick={handleFavoritesClick}
          />
          <IconWithBadge
            icon={<LuShoppingCart className='h-8 w-8' />}
            count={2}
            onClick={handleCartClick}
          />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {activeSheet === 'favorites' ? 'Favorites' : 'Shopping Cart'}
          </SheetTitle>
        </SheetHeader>
        <SheetClose />
        <SheetFooter>
          {activeSheet === 'favorites' ? <FavoritesSheet /> : <CartSheet />}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default RightMenu
