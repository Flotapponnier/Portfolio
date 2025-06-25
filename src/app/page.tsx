import TopBar from "./frontend/topbar";
import BottomBar from "./frontend/bottombar";
import Portfolio from "./frontend/portfolio";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />

      <main className="flex-1 p-6 space-y-10">
        <Portfolio />
      </main>

      <BottomBar />
    </div>
  );
}

