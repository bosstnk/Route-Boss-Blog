import { Eye, EyeOff, EyeClosed } from 'lucide-react';
import { Button } from './common/Button';
import usePasswordVisibility from '@/hooks/usePasswordVisibility';

function AdminLogIn() {
    const baseInput =
        "bg-white py-3 pr-3 pl-4 text-body-1 outline-none rounded-lg placeholder:text-base-brown-400 transition-colors ";

    const normalInput =
        "border border-base-brown-300 text-base-brown-400 focus:border-base-brown-500 focus:ring-1 focus:ring-base-brown-300 focus-within:border-base-brown-500 focus-within:ring-1 focus-within:ring-base-brown-300";

    const errorInput =
        "border border-brand-red focus:border-brand-red focus:ring-1 focus:ring-brand-red focus-within:border-brand-red focus-within:ring-1 focus-within:ring-brand-red";

    const {isVisible, inputType, toggleVisibility,} = usePasswordVisibility()
    return (
        <div className="max-w-[798px] flex flex-col gap-10 py-[60px] px-[120px] bg-base-brown-200 rounded-2xl mx-auto mt-36">
            <div className="text-center space-y-2">
                <h4 className="text-headline-4 leading-7 text-brand-orange">Admin panel</h4>
                <h2 className="text-headline-2 leading-12 text-base-brown-600">Log In</h2>
            </div>
            <form
                className="flex flex-col">
                <label htmlFor="email" className="mb-1">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={`${baseInput}`} />
                <label htmlFor="password" className="mb-1 mt-7">Password</label>
                <div className={`flex flex-row ${baseInput}`} >
                    <input
                        id="password"
                        name="password"
                        type={inputType}
                        placeholder="Password"
                        className="grow outline-none placeholder:text-base-brown-400"
                    />
                    <button type="button" className="cursor-pointer" onClick={toggleVisibility}>
                        {isVisible ? <Eye size={20} /> : <EyeClosed size={20} />}
                    </button>
                </div>

                <Button type="submit" variant="primary" text="Log in" className="mt-10 self-center" />
            </form>
        </div>
    )
}

export default AdminLogIn