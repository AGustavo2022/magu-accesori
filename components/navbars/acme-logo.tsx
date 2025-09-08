import Link from 'next/link'

function AcmeLogo() {
  return (
    <div>
      <Link
        key='AcmeLogo001'
        href="/"
      >
        <h1 className='text-2xl font-bold'>MAGU
          <span>-accesori</span>
        </h1>
      </Link>
    </div>
  )
}

export default AcmeLogo