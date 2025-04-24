import LoginButton from "../components/auth/LoginButton";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        나만의 Notion에 오신 걸 환영합니다
      </h1>
      <LoginButton />
    </main>
  );
}
