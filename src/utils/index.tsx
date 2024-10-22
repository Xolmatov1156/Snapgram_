import { Suspense } from "react"
import { Triangle } from "react-loader-spinner"

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black"><Triangle
    visible={true}
    height="80"
    width="80"
    color="white"
    ariaLabel="triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    /></div>
  )
}

const SuspenseComponent = ({children} : {children: JSX.Element}) => {
    return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export {Loading,SuspenseComponent}