import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/form/userInfo')
  return (
    <main className="flex h-full flex-col items-center justify-between p-24"></main>
  );
}
