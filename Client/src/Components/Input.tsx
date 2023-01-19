const Input = ({ classname, type, label, handler }: any) => {
    return (
        <div className={`${classname}`}>
            <input type={`${type}`} onChange={(e) => { handler(e.target.value) }} required />
            <span></span>
            <label >{label}</label>
        </div>
    );
}

export default Input;