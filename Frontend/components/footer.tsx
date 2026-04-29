export default function Footer() {
  return (
    <footer className="bg-black border-t border-orange-400 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col items-center gap-4">

        
        <div className="flex gap-6 text-white text-sm font-medium">
          <span className="hover:text-orange-400 transition">Jerrie</span>
          <span className="hover:text-orange-400 transition"> Lucas</span>
          <span className="hover:text-orange-400 transition"> Kristian</span>
          <span className="hover:text-orange-400 transition"> Emil</span>
        </div>

        <div className="w-full h-px bg-orange-400 opacity-30"></div>

        <p className="text-gray-400 text-xs">
          © {new Date().getFullYear()} FoodAssistant 
        </p>
      </div>
    </footer>
  );
}