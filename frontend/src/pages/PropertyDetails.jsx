import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePropertyDetails } from '../hooks/usePropertyDetails';
import { useToggleFavourite } from '../hooks/useFavourites';
import { useProperties } from '../hooks/useProperties';
import { ArrowLeft, MapPin, Heart, Plane, Layout, CheckCircle2, ShieldCheck, Share2, Hexagon } from 'lucide-react';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { property, isLoading, error } = usePropertyDetails(id);
    const { isFavourite } = useProperties(1);
    const { addMutation, removeMutation } = useToggleFavourite();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
                <div className="relative">
                    <div className="h-16 w-16 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Hexagon className="h-6 w-6 text-white animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-white text-center">
                <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10 backdrop-blur-xl">
                    <div className="h-20 w-20 bg-red-500/20 text-red-400 rounded-3xl flex items-center justify-center mx-auto mb-8">
                        <MapPin className="h-10 w-10" />
                    </div>
                    <h2 className="text-4xl font-black mb-4 tracking-tighter">Property Missing</h2>
                    <p className="text-zinc-500 max-w-sm mx-auto mb-10 font-medium leading-relaxed">The architectural listing you are seeking is either restricted or has been archived from our network.</p>
                    <button onClick={() => navigate('/dashboard')} className="px-10 py-5 bg-white text-zinc-950 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                        Return to Gallery
                    </button>
                </div>
            </div>
        );
    }

    const favourited = isFavourite(Number(id));

    const handleToggleFavourite = () => {
        if (favourited) {
            removeMutation.mutate(Number(id));
        } else {
            addMutation.mutate({ propertyId: Number(id) });
        }
    };

    const mockLongDescription = `
${property.description}

This magnificent estate represents the pinnacle of luxury architecture. Defined by its seamless integration of indoor and outdoor environments, the residence features custom-crafted materials throughout, from the hand-polished stone surfaces to the precision-engineered floor-to-ceiling glass expanses.

Designed for an elevated lifestyle, the property offers a harmonious balance of private sanctuaries and grand entertaining spaces. Every corner of the residence has been optimized for natural illumination, ensuring a vibrant and inviting atmosphere regardless of the hour. With cutting-edge sustainable technology and uncompromised security protocols, this listing is not just a home—it is a private retreat from the world.
    `.trim();

    return (
        <div className="min-h-screen relative font-sans text-white pb-24 overflow-x-hidden">
            <div className="fixed inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80"
                    alt="Elite Real Estate"
                    className="w-full h-full object-cover scale-[1.02]"
                />
                <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/30 to-zinc-950"></div>
            </div>

            <div className="sticky top-0 z-50 w-full px-6 py-8 pointer-events-none">
                <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-zinc-950/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-4 group"
                    >
                        <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:block">Back to Gallery</span>
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleToggleFavourite}
                            className={`p-4 rounded-2xl border backdrop-blur-xl transition-all ${favourited ? 'bg-red-500/10 border-red-500/30' : 'bg-zinc-950/40 border-white/10 text-zinc-400'}`}
                        >
                            <Heart className={`h-5 w-5 transition-all ${favourited ? 'fill-red-500 text-red-500 scale-110' : 'text-white'}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="w-full h-[50vh] sm:h-[65vh] rounded-[3.5rem] overflow-hidden relative shadow-3xl border border-white/5 mb-16">
                    <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent"></div>

                    <div className="absolute bottom-10 left-10 hidden sm:flex items-center gap-6">
                        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-green-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Global Certified Listing</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-10">
                        <div className="bg-white/5 backdrop-blur-3xl p-10 sm:p-14 rounded-[3.5rem] border border-white/10 shadow-2xl">
                            <div className="mb-12">
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Residential Masterpiece</p>
                                <h1 className="text-6xl sm:text-7xl font-black tracking-tighter leading-none mb-10">{property.title}</h1>

                                <div className="flex flex-wrap items-center gap-10">
                                    <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-2xl border border-white/5">
                                        <MapPin className="h-5 w-5 text-zinc-400" />
                                        <span className="text-lg font-bold text-zinc-200">{property.location}</span>
                                    </div>
                                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-800"></div>
                                    <div className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Available Immedately</div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h2 className="text-2xl font-black tracking-tight">Executive Summary</h2>
                                <div className="h-px w-20 bg-white/10"></div>
                                <p className="text-zinc-400 leading-relaxed text-xl font-medium whitespace-pre-line opacity-90">{mockLongDescription}</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4">
                        <div className="bg-white/5 backdrop-blur-3xl p-10 sm:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl sticky top-36">
                            <div className="mb-0">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-white whitespace-nowrap">
                                        Rs. {Number(property.price).toLocaleString()}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-0"></div>
        </div>
    );
};

export default PropertyDetails;
