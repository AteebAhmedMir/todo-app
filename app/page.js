import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to /login when the home route is accessed
  redirect('/login');
}
