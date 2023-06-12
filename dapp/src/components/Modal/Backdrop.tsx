interface BackdropProps {
  onClose: () => void
}

export default function Backdrop({ onClose }: BackdropProps) {
  return (
    <div
      className='fixed left-0 top-0 z-20 h-screen w-full cursor-pointer bg-[#000000bf]'
      onClick={onClose}
      aria-hidden
    />
  )
}
