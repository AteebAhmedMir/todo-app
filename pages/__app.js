import Link from 'next/link';
import '../styles/globals.css'; // You can customize this to include global styles

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Signup</Link>
          </li>
          <li>
            <Link href="/edit-tasks">Edit Tasks</Link>
          </li>
        </ul>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
