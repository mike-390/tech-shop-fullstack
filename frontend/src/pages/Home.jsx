import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GridScan } from '../components/GridScan'; 
import { 
  ArrowRight, 
  CheckCircle, 
  Cpu, 
  Globe, 
  Package, 
  Shield, 
  Smartphone, 
  Truck, 
  LayoutDashboard, 
  PackageSearch,
  ScanLine 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSmartButtonClick = () => {
    if (!user) {
      toast.error("Please login to track your orders");
      navigate('/login');
    } else if (user.role === 'ADMIN') {
      navigate('/admin/orders');
    } else {
      navigate('/my-orders');
    }
  };

  return (
    <div className="bg-white selection:bg-indigo-500 selection:text-white overflow-x-hidden font-sans">
      
      {/* CSS: ANIMATIONS & BACKGROUNDS */}
      <style>{`
        /* Το Aurora Effect */
        @keyframes aurora {
          0% { background-position: 50% 50%, 50% 50%; }
          50% { background-position: 100% 0%, 0% 100%; }
          100% { background-position: 50% 50%, 50% 50%; }
        }
        .bg-aurora {
          background-image: 
            radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.10) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.10) 0px, transparent 50%);
          animation: aurora 10s ease infinite;
          background-size: 140% 140%;
        }

        /* Floating Animations */
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) rotate(-6deg); } 50% { transform: translateY(-12px) rotate(-6deg); } }
        @keyframes float-van { 0%, 100% { transform: translateY(0px) rotate(-2deg); } 50% { transform: translateY(-15px) rotate(-2deg); } }
        
        .animate-float-gaming { animation: float-1 6s ease-in-out infinite; }
        .animate-float-van { animation: float-van 5s ease-in-out infinite; }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        
        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-aurora -z-20"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay -z-20"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div className="relative z-20 max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
              FUTURE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                READY.
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-lg mb-10 font-medium leading-relaxed">
              Experience technology without boundaries. 
              Top-tier gadgets across all categories, delivered instantly.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200/50 hover:shadow-indigo-200 hover:-translate-y-1 flex items-center gap-2 group">
                Shop Now <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button 
                onClick={handleSmartButtonClick}
                className="px-10 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-full font-bold hover:border-indigo-200 hover:bg-indigo-50/50 transition-all flex items-center gap-2"
              >
                {!user ? (
                   <>Track Order <PackageSearch className="h-5 w-5 text-slate-400" /></>
                ) : user.role === 'ADMIN' ? (
                   <>Dashboard <LayoutDashboard className="h-5 w-5 text-indigo-600" /></>
                ) : (
                   <>My Orders <PackageSearch className="h-5 w-5 text-indigo-600" /></>
                )}
              </button>
            </div>
          </div>

          {/* 👇 RIGHT VISUAL: GRID SCAN & VAN */}
          <div className="relative h-[700px] w-full hidden lg:block overflow-hidden rounded-[3rem] border border-slate-100 shadow-2xl shadow-indigo-200/50 group">
             
             {/* BACKGROUND*/}
             <div className="absolute inset-0 bg-slate-950">
                <GridScan 
                    lineThickness={1.5}
                    linesColor="#4f46e5"      // Indigo-600 lines
                    scanColor="#3b82f6"       // Sky-400 scan beam
                    scanOpacity={0.6}
                    gridScale={0.12}
                    scanOnClick={true}        // scan effect
                    scanDuration={2.5}
                    bloomIntensity={1.0}      
                />
             </div>

             {/* TOP LABEL: SYSTEM STATUS */}
             <div className="absolute top-8 left-0 right-0 flex justify-center z-10">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <span className="text-white font-mono text-sm tracking-widest font-bold flex items-center gap-2">
                        <ScanLine className="w-4 h-4 text-indigo-300" />
                        GLOBAL LOGISTICS NETWORK
                    </span>
                </div>
             </div>
             
             {/* 3. THE VAN CONTAINER */}
             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                 <div className="relative animate-float-van">
                     <img 
                         src="/van.png"
                         alt="Delivery Van" 
                         className="w-[500px] h-auto drop-shadow-2xl transform -rotate-2"
                     />
                     <div className="absolute -bottom-10 left-10 right-10 h-12 bg-black/60 blur-2xl rounded-[100%]"></div>
                 </div>
             </div>

             {/* 4. OVERLAY GRADIENT */}
             <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>

          </div>
        </div>
    </section>

      {/* 2. DIGITAL STORE SECTION */}
      <section className="py-24 relative z-10 -mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-16">
            <Globe className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" />
            
            <div className="flex-1 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-sm font-bold mb-6">
                <Package className="h-4 w-4" /> The New Standard
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
                100% Digital. <br />
                <span className="text-indigo-400">Zero Limits.</span>
              </h2>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-xl">
                We don't have a physical address, and that's our superpower. 
                Operating entirely in the cloud means lower costs, 24/7 availability, 
                and a seamless shopping experience tailored for you.
              </p>
              <ul className="grid sm:grid-cols-2 gap-4">
                <li className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <CheckCircle className="text-green-400 h-6 w-6" />
                  <span className="font-bold text-slate-200">Best Market Prices</span>
                </li>
                <li className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <CheckCircle className="text-green-400 h-6 w-6" />
                  <span className="font-bold text-slate-200">Shop from Anywhere</span>
                </li>
              </ul>
            </div>

            <div className="flex-1 flex justify-center z-10">
               <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-12 rounded-3xl max-w-sm rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl">
                  <Cpu className="h-24 w-24 text-indigo-400 mb-8" />
                  <h3 className="text-3xl font-bold mb-4">Cloud Native</h3>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    "We exist everywhere you are. The store that never sleeps, powered by next-gen infrastructure."
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Why TechShop?</h2>
            <p className="text-xl text-slate-600">Redefining the standard.</p>
          </div>
          <Link to="/about" className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-2 group text-lg bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all">
            Read our manifesto <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-8 h-auto md:h-[700px]">
          
          {/* Card 1: Logistics */}
          <div className="md:col-span-2 md:row-span-2 bg-slate-50 rounded-[1.5rem] p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
               <Truck className="h-8 w-8 text-black mb-4" />
               <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">Global Logistics</h3>
                  <p className="text-slate-900 font-bold text-lg leading-relaxed">
                    Precision delivery tracking from our cloud warehouse to your doorstep.
                  </p>
               </div>
            </div>
          </div>

          {/* Card 2: Warranty */}
          <div className="md:col-span-2 bg-indigo-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500 shadow-xl z-10">
             <div className="absolute -top-12 -right-12 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Shield className="h-56 w-56" />
             </div>
             <div className="relative z-10 h-full flex flex-col justify-center">
                <Shield className="h-14 w-14 text-indigo-300 mb-6" />
                <h3 className="text-3xl font-bold mb-3">Ironclad Warranty</h3>
                <p className="text-indigo-200 text-lg max-w-sm leading-relaxed">
                  2-year comprehensive digital coverage. No paperwork, just peace of mind.
                </p>
             </div>
          </div>

          {/* Card 3: Mobile */}
          <div className="bg-slate-800 rounded-[2.5rem] p-10 text-white flex flex-col justify-between group shadow-lg hover:shadow-indigo-300/50 transition-all duration-300 z-10 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700"></div>
             <div className="relative z-10">
                <Smartphone className="h-12 w-12 text-white mb-4" />
                <h3 className="text-2xl font-bold mb-2">Mobile First</h3>
                <p className="text-slate-300 font-medium">Shop from your pocket.</p>
             </div>
          </div>

          {/* Card 4: Support */}
          <div className="bg-white rounded-[2.5rem] p-10 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] transition-all duration-300 z-10 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1748&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale"></div>
             <div className="flex -space-x-4 relative z-10">
                <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 shadow-sm flex items-center justify-center text-sm font-bold text-slate-600">JD</div>
                <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-300 shadow-sm flex items-center justify-center text-sm font-bold text-slate-600">AL</div>
                <div className="w-12 h-12 rounded-full border-4 border-white bg-indigo-500 shadow-sm flex items-center justify-center text-sm font-bold text-white">+5</div>
             </div>
             <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">24/7 Support</h3>
                <p className="text-slate-500 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Real humans online.
                </p>
             </div>
          </div>

        </div>
      </section>
    </div>
  );
}