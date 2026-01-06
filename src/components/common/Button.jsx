function Button({text,variant="primary",className="",...props}) {
    const base = "text-body-1 inline-flex items-center justify-center rounded-full px-10 py-3 leading-6"
    const variants = {
        primary: "text-base-white bg-base-brown-600",
        secondary: "text-base-brown-600 bg-base-white border border-base-brown-400"
    }
    return (
        <button className={`${base} ${variants[variant]} ${className}`} 
        {...props}
        >
            {text}
        </button>
    )    
}

export default Button