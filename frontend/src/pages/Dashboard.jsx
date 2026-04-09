import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties';
import { useToggleFavourite } from '../hooks/useFavourites';
import userApi from '../api/userApi';
import { Heart, LogOut, Home, Key, MapPin, Search, ChevronRight, LayoutGrid } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const { properties, pagination, favourites, isPropertiesLoading, isFavouritesLoading, isFavourite } = useProperties(page, searchTerm);
    const { addMutation, removeMutation } = useToggleFavourite();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await userApi.getProfile();
                if (res.data) setUser(res.data);
            } catch (err) {
                localStorage.removeItem('accessToken');
                navigate('/login');
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    const handleToggleFavourite = (propertyId) => {
        if (isFavourite(propertyId)) {
            removeMutation.mutate(propertyId);
        } else {
            addMutation.mutate({ propertyId });
        }
    };

    if (isFavouritesLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
                <div className="relative">
                    <div className="h-16 w-16 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Home className="h-6 w-6 text-white animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative font-sans text-white overflow-x-hidden">
            <div className="fixed inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80"
                    alt="Elite Real Estate"
                    className="w-full h-full object-cover scale-[1.02]"
                />
                <div className="absolute inset-0 bg-zinc-950/85 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-950"></div>
            </div>

            <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-950/40 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center transition-all duration-300">
                    <div className="flex items-center gap-5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 shadow-huge group-hover:bg-white/20 transition-all active:scale-95">
                            <Home className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-[0.15em] uppercase leading-none mb-1">Elite Portal</h1>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">Global Network</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="hidden lg:flex items-center gap-10 bg-white/5 px-10 py-3 rounded-[1.8rem] border border-white/5 shadow-2xl shadow-black/20 font-sans">
                            <div className="text-left flex flex-col justify-center min-w-[80px]">
                                <p className="text-base font-black tracking-tight leading-none mb-1.5 whitespace-nowrap">{user.name}</p>
                                <p className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em] leading-none opacity-80 whitespace-nowrap">{user.role}</p>
                            </div>
                            <div className="h-11 w-11 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-2xl flex items-center justify-center text-white font-black shadow-inner ring-1 ring-white/10 text-base">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="bg-white/5 hover:bg-red-500/20 px-6 py-3 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all text-white/70 hover:text-red-400 font-bold active:scale-95 group"
                            title="Sign out"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-widest hidden xl:block">Logout</span>
                                <LogOut className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">

                {favourites && favourites.length > 0 && (
                    <section className="mb-20 animate-in fade-in duration-1000">
                        <div className="mb-10 flex items-end justify-between">
                            <div className="space-y-1">
                                <h2 className="text-4xl font-black tracking-tighter">My Favourites</h2>
                                <p className="text-zinc-500 font-medium tracking-wide">Saved masterpiece residences.</p>
                            </div>
                            <div className="h-px flex-1 bg-white/5 mx-10 mb-3 hidden sm:block"></div>
                            <span className="bg-white/10 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-white/10">{favourites.length} Items</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {favourites.map((property) => (
                                <Link
                                    to={`/property/${property.id}`}
                                    key={property.id}
                                    className="group relative bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 block"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={property.imageUrl}
                                            alt={property.title}
                                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleToggleFavourite(property.id);
                                            }}
                                            className="absolute top-4 right-4 p-3 rounded-full bg-zinc-950/60 backdrop-blur shadow-massive hover:scale-110 active:scale-90 transition-all z-10 border border-white/10"
                                        >
                                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-black text-white text-lg leading-tight mb-2 group-hover:text-zinc-300 transition-colors">{property.title}</h3>
                                        <p className="text-zinc-400 font-black text-xs uppercase tracking-widest">Rs. {Number(property.price).toLocaleString()}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <section>
                    <div className="mb-12 flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-5xl font-black tracking-tighter">Global Gallery</h2>
                            <p className="text-zinc-500 font-medium tracking-wide">Explore current listings across the network.</p>
                        </div>
                        <div className="hidden sm:flex items-center gap-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-white transition-colors">
                                    <Search className="h-4 w-4" />
                                </div>
                                <input 
                                    className="block w-64 pl-12 pr-6 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-white/20 focus:border-white/30 focus:bg-white/10 outline-none transition-all text-sm text-white placeholder-zinc-500 font-medium" 
                                    type="text" 
                                    placeholder="Search by title or location..." 
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setPage(1); 
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {isPropertiesLoading ? (
                            [...Array(3)].map((_, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/5 h-[400px] animate-pulse relative overflow-hidden">
                                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                </div>
                            ))
                        ) : properties.length > 0 ? (
                            properties.map((property, idx) => (
                                <Link
                                    to={`/property/${property.id}`}
                                    key={property.id}
                                    className="group relative bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl transition-all duration-700 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 flex flex-col h-full"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={property.imageUrl}
                                            alt={property.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
    
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 inline-flex items-center gap-2">
                                                <MapPin className="h-3 w-3 text-zinc-400" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{property.location.split(',')[0]}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 pb-10 flex-1 flex flex-col">
                                        <div className="mb-4">
                                            <h3 className="font-black text-2xl text-white leading-tight group-hover:translate-x-1 transition-transform">{property.title}</h3>
                                        </div>
                                        <p className="text-zinc-500 text-sm font-medium leading-relaxed line-clamp-2 mb-8 flex-1">{property.description}</p>
    
                                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                            <p className="font-black text-zinc-900 bg-zinc-100 px-3 py-1.5 rounded-xl text-sm whitespace-nowrap">
                                                Rs. {Number(property.price).toLocaleString()}
                                            </p>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleToggleFavourite(property.id);
                                                }}
                                                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all hover:scale-110 active:scale-90"
                                            >
                                                <Heart
                                                    className={`h-5 w-5 transition-all duration-500 ${isFavourite(property.id) ? 'fill-red-500 text-red-500 scale-110' : 'text-white/30 hover:text-white/60'}`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-32 text-center animate-in fade-in zoom-in duration-700">
                                <div className="inline-block p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl mb-10 shadow-huge">
                                    <Search className="h-16 w-16 text-zinc-800 mb-6 mx-auto stroke-[1.5]" />
                                    <h3 className="text-2xl font-black tracking-tight mb-2">No properties found</h3>
                                    <p className="text-zinc-500 font-medium tracking-wide max-w-xs mx-auto">We couldn't find any results for "{searchTerm}". Try adjusting your search.</p>
                                </div>
                                <button 
                                    onClick={() => { setSearchTerm(""); setPage(1); }}
                                    className="block mx-auto text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
                                >
                                    Clear Search Query
                                </button>
                            </div>
                        )}
                    </div>

                    {pagination && pagination.totalPages > 1 && (
                        <div className="mt-20 flex items-center justify-center gap-4 border-t border-white/5 pt-12">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-6 py-3 bg-white/5 rounded-xl text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all disabled:opacity-10 border border-white/5"
                            >
                                Previous
                            </button>
                            <div className="flex items-center gap-2">
                                {[...Array(pagination.totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        className={`h-10 w-10 flex items-center justify-center rounded-xl text-xs font-black transition-all ${page === i + 1 ? 'bg-white text-zinc-950 shadow-xl' : 'bg-white/5 text-zinc-500 hover:bg-white/10 border border-white/5'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                                disabled={page === pagination.totalPages}
                                className="px-6 py-3 bg-white/5 rounded-xl text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all disabled:opacity-10 border border-white/5"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </section>
            </main>

            <div className="fixed bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-0"></div>
        </div>
    );
};

export default Dashboard;
