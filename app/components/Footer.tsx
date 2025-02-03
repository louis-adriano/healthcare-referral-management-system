import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 p-4 mt-auto">
      <div className="container mx-auto text-center">
        <Link href="/privacy-policy">
          <a className="text-blue-600 hover:underline mr-4" aria-label="Privacy Policy">
            Privacy Policy
          </a>
        </Link>
        <Link href="/terms-of-use">
          <a className="text-blue-600 hover:underline" aria-label="Terms of Use">
            Terms of Use
          </a>
        </Link>
      </div>
    </footer>
  );
}