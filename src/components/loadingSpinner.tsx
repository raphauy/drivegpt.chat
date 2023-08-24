
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full p-10">
      <div className="w-10 h-10 border-t-2 border-b-2 rounded-full border-first-color animate-spin"></div>
    </div>
  )
}


export function LoadingSpinnerChico() {
  return (
    <div className="flex items-center justify-center w-full h-full p-5">
      <div className="w-5 h-5 border-t-2 border-b-2 rounded-full border-first-color animate-spin"></div>
    </div>
  )
}

export function LoadingCuadraditos() {
  return (
    <div className="flex items-center justify-center w-full h-full p-5">
      <div className="w-10 h-5 border-t-2 border-b-2 rounded-full border-first-color animate-spin"></div>
    </div>
  )
}

export function LoadingSvg() {
  return (
    <div className="flex justify-center space-x-10">
      <svg className="w-5 h-5 delay-100 rounded fill-current text-first-color animate-ping" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 10">
        <rect width="30" height="10"/>
      </svg>
      <svg className="w-5 h-5 delay-200 rounded fill-current text-first-color animate-ping" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 10">
        <rect width="30" height="10"/>
      </svg>
      <svg className="w-5 h-5 delay-300 rounded fill-current text-first-color animate-ping" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 10">
        <rect width="30" height="10"/>
      </svg>
    </div>
  )
}

