import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import userApi from '../api/userApi';
import { KeyRound, Mail, User, Home, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).');
            return;
        }

        setLoading(true);
        try {
            const res = await userApi.register({ name, email, password });
            if (res.accessToken) {
                localStorage.setItem('accessToken', res.accessToken);
                toast.success('Registration successful!');
                navigate('/dashboard');
            }
        } catch (err) {
            toast.error(err || 'Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-6 sm:p-12 overflow-hidden font-sans">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80"
                    alt="Luxury Interior"
                    className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-[1px]"></div>
                <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-zinc-800/20 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-zinc-700/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">

                <div className="w-full lg:w-1/2 text-white">
                    <div className="flex items-center gap-4 mb-10 group cursor-default">
                        <div className="bg-white/10 backdrop-blur-xl p-4 rounded-[2rem] border border-white/20 group-hover:bg-white/20 transition-all duration-500 shadow-2xl shadow-black/20">
                            <Home className="h-8 w-8 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-[0.2em] uppercase opacity-90">Buyer Portal</span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-black leading-[1.1] mb-8 tracking-tighter">
                        Your journey <br />
                        <span className="text-zinc-400">starts here.</span>
                    </h1>

                    <p className="text-zinc-300 text-xl max-w-md leading-relaxed font-medium mb-12 opacity-80">
                        Join an elite circle of homeowners. Save properties, track your favorites, and experience a new standard in real estate discovery.
                    </p>

                    <div className="hidden sm:grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-500"></div>
                            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Premium Gallery</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-500"></div>
                            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Verified Specs</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-500"></div>
                            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Instant Access</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-500"></div>
                            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Global Support</p>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-[480px]">
                    <div className="bg-white/10 backdrop-blur-[32px] rounded-[3rem] p-8 sm:p-12 border border-white/20 shadow-2xl shadow-black/40 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-black text-white mb-3 tracking-tight">Register</h2>
                            <p className="text-zinc-400 mb-10 font-medium">Create your credentials to get full access.</p>

                            <form onSubmit={handleRegister} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-zinc-500">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <input
                                            className="block w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-[1.5rem] focus:ring-2 focus:ring-white/20 focus:border-white/30 focus:bg-white/10 outline-none transition-all text-white placeholder-zinc-600 font-medium"
                                            type="text"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-zinc-500">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <input
                                            className="block w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-[1.5rem] focus:ring-2 focus:ring-white/20 focus:border-white/30 focus:bg-white/10 outline-none transition-all text-white placeholder-zinc-600 font-medium"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-zinc-500">
                                            <KeyRound className="h-5 w-5" />
                                        </div>
                                        <input
                                            className="block w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-[1.5rem] focus:ring-2 focus:ring-white/20 focus:border-white/30 focus:bg-white/10 outline-none transition-all text-white placeholder-zinc-600 font-medium"
                                            type="password"
                                            placeholder="Min 8 characters"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-3 py-5 px-4 rounded-[1.5rem] shadow-xl text-sm font-black text-zinc-900 bg-white hover:bg-zinc-100 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest mt-4 group"
                                >
                                    {loading ? 'Creating...' : (
                                        <>
                                            Sign Up Now
                                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 pt-8 border-t border-white/10 text-center">
                                <p className="text-zinc-500 font-medium text-sm">
                                    Member already?
                                    <Link to="/login" className="ml-2 text-white font-black hover:underline uppercase tracking-tighter">Log in</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register;
