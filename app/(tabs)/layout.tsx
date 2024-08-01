import TabBar from "@/components/tab-bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-16">
      {children} <TabBar />
    </div>
  );
}
