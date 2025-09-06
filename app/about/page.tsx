import SearchNew from '@/components/search'
import { Suspense } from 'react'


function About() {
  return (
    <Suspense>
      <SearchNew placeholder="Buscar Productos" />
    </Suspense>
  )
}

export default About