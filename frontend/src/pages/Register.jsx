import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import userApi from '../api/userApi';
import { KeyRound, Mail, User, Home, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validate = (field, value) => {
    switch (field) {
        case 'name':
            return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address';
        case 'password':
            return passwordRegex.test(value)
                ? ''
                : 'Min 8 chars, uppercase, lowercase, number & special character (@$!%*?&)';
        default:
            return '';
    }
};

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({ name: '', email: '', password: '' });
    const [touched, setTouched] = useState({ name: false, email: false, password: false });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (touched[field]) {
            setErrors(prev => ({ ...prev, [field]: validate(field, value) }));
        }
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        setErrors(prev => ({ ...prev, [field]: validate(field, form[field]) }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const allTouched = { name: true, email: true, password: true };
        const allErrors = {
            name: validate('name', form.name),
            email: validate('email', form.email),
            password: validate('password', form.password),
        };
        setTouched(allTouched);
        setErrors(allErrors);

        if (Object.values(allErrors).some(e => e)) return;

        setLoading(true);
        try {
            const res = await userApi.register(form);
            if (res.accessToken) {
                localStorage.setItem('accessToken', res.accessToken);
                toast.success('Registration successful!');
                navigate('/dashboard');
            }
        } catch (err) {
            if (err?.errors?.length > 0) {
                err.errors.forEach(e => toast.error(`${e.field}: ${e.message}`));
            } else {
                toast.error(typeof err === 'string' ? err : err.message || 'Registration failed.');
            }
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (field) =>
        `block w-full pl-14 pr-6 py-4 bg-white/5 border rounded-[1.5rem] focus:ring-2 outline-none transition-all text-white placeholder-zinc-600 font-medium ${errors[field] && touched[field]
            ? 'border-red-400/60 focus:ring-red-400/20 focus:border-red-400/60'
            : 'border-white/10 focus:ring-white/20 focus:border-white/30 focus:bg-white/10'
        }`;

    return (
        <div className="relative flex items-center justify-center min-h-screen p-6 overflow-hidden font-sans sm:p-12">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80"
                    alt="Luxury Interior"
                    className="object-cover w-full h-full scale-105"
                />
                <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-[1px]"></div>
                <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-zinc-800/20 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-zinc-700/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-between w-full max-w-6xl gap-12 lg:flex-row lg:gap-24">

                <div className="w-full text-white lg:w-1/2">
                    <div className="flex items-center gap-4 mb-10 cursor-default group">
                        <div className="bg-white/10 backdrop-blur-xl p-4 rounded-[2rem] border border-white/20 group-hover:bg-white/20 transition-all duration-500 shadow-2xl shadow-black/20">
                            <Home className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-[0.2em] uppercase opacity-90">Buyer Portal</span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-black leading-[1.1] mb-8 tracking-tighter">
                        Your journey <br />
                        <span className="text-zinc-400">starts here.</span>
                    </h1>

                    <p className="max-w-md mb-12 text-xl font-medium leading-relaxed text-zinc-300 opacity-80">
                        Join an elite circle of homeowners. Save properties, track your favorites, and experience a new standard in real estate discovery.
                    </p>

                    <div className="hidden grid-cols-2 gap-8 pt-10 border-t sm:grid border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-500"></div>
                            <p className="text-sm font-bold tracking-widest uppercase text-zinc-400">Premium Gallery</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-500"></div>
                            <p className="text-sm font-bold tracking-widest uppercase text-zinc-400">Verified Specs</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-500"></div>
                            <p className="text-sm font-bold tracking-widest uppercase text-zinc-400">Instant Access</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-500"></div>
                            <p className="text-sm font-bold tracking-widest uppercase text-zinc-400">Global Support</p>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-[480px]">
                    <div className="bg-white/10 backdrop-blur-[32px] rounded-[3rem] p-8 sm:p-12 border border-white/20 shadow-2xl shadow-black/40 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h2 className="mb-3 text-4xl font-black tracking-tight text-white">Register</h2>
                            <p className="mb-10 font-medium text-zinc-400">Create your credentials to get full access.</p>

                            <form onSubmit={handleRegister} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-zinc-500">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <input
                                            className={inputClass('name')}
                                            type="text"
                                            placeholder="John Doe"
                                            value={form.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            onBlur={() => handleBlur('name')}
                                            required
                                        />
                                    </div>
                                    {errors.name && touched.name && (
                                        <p className="mt-1 ml-2 text-xs font-medium text-red-400">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-zinc-500">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <input
                                            className={inputClass('email')}
                                            type="email"
                                            placeholder="john@example.com"
                                            value={form.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            onBlur={() => handleBlur('email')}
                                            required
                                        />
                                    </div>
                                    {errors.email && touched.email && (
                                        <p className="mt-1 ml-2 text-xs font-medium text-red-400">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-zinc-500">
                                            <KeyRound className="w-5 h-5" />
                                        </div>
                                        <input
                                            className={inputClass('password')}
                                            type="password"
                                            placeholder="Min 8 characters"
                                            value={form.password}
                                            onChange={(e) => handleChange('password', e.target.value)}
                                            onBlur={() => handleBlur('password')}
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                    {errors.password && touched.password && (
                                        <p className="mt-1 ml-2 text-xs font-medium text-red-400">{errors.password}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-3 py-5 px-4 rounded-[1.5rem] shadow-xl text-sm font-black text-zinc-900 bg-white hover:bg-zinc-100 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest mt-4 group"
                                >
                                    {loading ? 'Creating...' : (
                                        <>
                                            Sign Up Now
                                            <ArrowRight className="w-4 h-4 transition-transform transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="pt-8 mt-8 text-center border-t border-white/10">
                                <p className="text-sm font-medium text-zinc-500">
                                    Member already?
                                    <Link to="/login" className="ml-2 font-black tracking-tighter text-white uppercase hover:underline">Log in</Link>
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