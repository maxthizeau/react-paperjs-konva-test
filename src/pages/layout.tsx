import { FC, ReactNode } from "react"

interface IProps {
  children: ReactNode
}

const RootLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-blue-950 flex justify-center items-center p-24 ">
      <div className="w-full h-full bg-white rounded-lg shadow-lg ">{children}</div>
    </div>
  )
}

export default RootLayout
