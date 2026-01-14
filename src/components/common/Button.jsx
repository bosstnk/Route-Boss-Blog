export function Button({text,variant="primary",className="",...props}) {
    const base = "text-body-1 leading-6 px-10 py-3 rounded-full"
    const variants = {
        primary: `${base} text-white bg-base-brown-600`,
        secondary: `${base} text-base-brown-600 bg-white border border-base-brown-400`,
        text:"text-body-1 text-base-brown-600 underline",
        tab:"text-body-1 px-5 py-3 text-base-brown-400"
    }
    return (
        <button className={`${variants[variant]} ${className}`} 
        {...props}
        >
            {text}
        </button>
    )    
}