interface InputElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    disabled?: boolean;
}

export function RadioButton({ label, id, disabled = false, ...rest }: InputElementProps){
    return(
        <div className="flex gap-2 items-center">
            <input className="cursor-pointer" id={id} type="radio" disabled={disabled} {...rest}/>
            <label 
                className={`font-medium ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} 
                htmlFor={id}
            >
                {label}
            </label>
        </div>
    );
};