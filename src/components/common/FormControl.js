import './FormControl.scss';

const FormControl = ({ input, meta, children, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={'form-element' + (hasError ? ' error' : '')}>
            <div>
                {children}
            </div>
            { hasError && <span className='error-message'>{meta.error}</span>}
        </div>
        
    )
}

export const Textarea = (props) => {
    const { input, meta, ...restProps } = props;
    return (<FormControl {...props}> <textarea {...input} {...restProps} /></FormControl>)
}

export const Input = (props) => {
    const { input, meta, ...restProps } = props;
    return (<FormControl {...props}> <input {...input} {...restProps} /></FormControl>)
}