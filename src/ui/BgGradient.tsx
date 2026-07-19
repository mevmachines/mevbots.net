const BgGradient = () => {
  return (
    <div
      className="w-full h-[50%] absolute z-[-1]"
      style={{
        background: `linear-gradient(180deg, rgba(97, 106, 115, 0.00) 0%, rgba(97, 106, 115, 0.12) 40%, rgba(97, 106, 115, 0.12) 60%, rgba(0, 0, 0, 0.00) 100%)`,
      }}
    />
  )
}

export { BgGradient }
