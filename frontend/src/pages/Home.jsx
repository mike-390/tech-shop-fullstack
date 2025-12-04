import { ArrowRight, CheckCircle, Zap, Shield, Globe, Cpu, Smartphone, Truck, Users, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* HERO SECTION: Clean, Premium, No Clutter */}
      <section className="relative pt-24 pb-24 lg:pt-36 lg:pb-48 overflow-hidden bg-white rounded-b-[4rem] shadow-sm z-20">
        {/* Subtle background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-transparent to-transparent -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="relative z-10">
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-8">
              FUTURE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                READY.
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-lg mb-12 font-medium leading-relaxed">
              Experience technology without boundaries. 
              The most advanced gadgets, delivered instantly to your door.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200/50 hover:shadow-indigo-200 hover:-translate-y-1 flex items-center gap-2 group">
                Shop Now <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="px-10 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-full font-bold hover:border-slate-300 transition-all">
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Visual: Clean Image, No badges */}
          <div className="relative z-0 hidden lg:block perspective-1000">
             <div className="relative transform rotate-y-3 hover:rotate-0 transition-all duration-1000 ease-out preserve-3d group">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-indigo-500 blur-[80px] opacity-15 rounded-[3rem] group-hover:opacity-25 transition-opacity"></div>
                
                {/* Main Image: Clean, Bright, Futuristic */}
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
                  alt="Future Tech Setup" 
                  className="relative rounded-[3rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] border-4 border-white object-cover w-full h-[650px] z-10"
                />
             </div>
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


      {/* 3. FEATURES SECTION: Perfected Bento Grid */}
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
        
        {/* BENTO GRID - Clean, Premium, Cohesive */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-8 h-auto md:h-[700px]">
          
          {/* Card 1: Logistics (Large Horizontal) - Clean White with Soft Shadow */}
          <div className="md:col-span-2 md:row-span-2 bg-white rounded-[2.5rem] p-12 relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] transition-all duration-500 z-10">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
               <div>
                  <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-8 text-indigo-600 group-hover:scale-110 transition-transform duration-500">
                    <Truck className="h-10 w-10" />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 mb-4">Lightning Logistics</h3>
                  <p className="text-slate-500 text-xl max-w-md leading-relaxed">
                    Optimized delivery routes ensure your gear arrives before you even miss it.
                  </p>
               </div>
               
               <div className="flex items-center gap-4 mt-8">
                  <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-indigo-600 rounded-full"></div>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">Avg. 24h</span>
               </div>
            </div>
          </div>

          {/* Card 2: Warranty (Top Right) - Deep Indigo Premium */}
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

          {/* Card 3: Mobile (Bottom Middle) - Vibrant Gradient */}
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-between group shadow-lg hover:shadow-indigo-300/50 transition-all duration-300 z-10">
             <Smartphone className="h-12 w-12 text-white/90 group-hover:scale-110 transition-transform" />
             <div>
                <h3 className="text-2xl font-bold mb-2">Mobile First</h3>
                <p className="text-indigo-100 font-medium">Shop from your pocket.</p>
             </div>
          </div>

          {/* Card 4: Support (Bottom Right) - Clean White & Avatars */}
          <div className="bg-white rounded-[2.5rem] p-10 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] transition-all duration-300 z-10">
             <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 shadow-sm flex items-center justify-center text-sm font-bold text-slate-600">JD</div>
                <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-300 shadow-sm flex items-center justify-center text-sm font-bold text-slate-600">AL</div>
                <div className="w-12 h-12 rounded-full border-4 border-white bg-indigo-500 shadow-sm flex items-center justify-center text-sm font-bold text-white">+5</div>
             </div>
             <div>
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