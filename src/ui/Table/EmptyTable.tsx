import { cn } from '#/utils'

import { searchFileIcon } from '#/assets'

interface Props {
  display?: 'rows' | 'grid'
  text?: string
  description?: string
  isSticky?: boolean
}

const EmptyTable: React.FC<Props> = ({
  display = 'rows',
  text = 'No results found',
  description = 'Try clearing your filters or changing your search term',
  isSticky = false,
}) => {
  return (
    <div
      className={cn(
        'bg-[#101012] border-x border-t border-[#23252A]',
        display === 'grid' && 'rounded-lg border-b',
      )}
    >
      <div
        className={cn(
          'h-70 flex items-center justify-center',
          isSticky &&
            'sticky top-0 left-1/2 -translate-x-1/2 max-w-62.5 md:max-w-full md:relative',
        )}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={searchFileIcon} alt="Not found" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-[16px] leading-6 font-semibold">{text}</span>
            <span className="text-[14px] leading-5 font-medium text-[#97979A] text-center">
              {description}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { EmptyTable }
