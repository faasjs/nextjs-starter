import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>FaasJS with Next.js example:</h1>
      <Link href='/todo'>Todo List</Link>
    </div>
  )
}
