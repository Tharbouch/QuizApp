const Input = ({ classname, type, label, value, handler }: any) => (
    <div className={`${classname}`}>
        <input type={`${type}`} value={value} onChange={(e) => { handler(e.target.value) }} required />
        <span></span>
        <label >{label}</label>
    </div>
);


export default Input;