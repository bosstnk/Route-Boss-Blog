import { Eye, EyeClosed } from 'lucide-react';
import usePasswordVisibility from '@/hooks/usePasswordVisibility';
import Button from '@/components/common/Button';
import FormInput from '@/components/common/FormInput';

function AdminLogIn() {
    const { isVisible, inputType, toggleVisibility } = usePasswordVisibility()
    return (
        <div className="max-w-[798px] flex flex-col gap-10 py-[60px] px-[120px] bg-base-brown-200 rounded-2xl mx-auto mt-36">
            <div className="text-center space-y-2">
                <h4 className="text-headline-4 leading-7 text-brand-orange">Admin panel</h4>
                <h2 className="text-headline-2 leading-12 text-base-brown-600">Log In</h2>
            </div>
            <form className="flex flex-col gap-7">
                <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                />
                <FormInput
                    label="Password"
                    name="password"
                    type={inputType}
                    placeholder="Password"
                    rightSlot={
                        <button type="button" className="cursor-pointer" onClick={toggleVisibility}>
                            {isVisible ? <Eye size={20} /> : <EyeClosed size={20} />}
                        </button>
                    }
                />
                <Button type="submit" variant="primary" className="mt-3 self-center">Log in</Button>
            </form>
        </div>
    )
}

export default AdminLogIn
