import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 p-4 mt-auto">
      <div className="container mx-auto text-center">
        <Link href="/privacy-policy" className="text-blue-600 hover:underline mr-4">
          Privacy Policy
        </Link>
        <Link href="/terms-of-use" className="text-blue-600 hover:underline">
          Terms of Use
        </Link>
      </div>
    </footer>
  )
}

