const TextArea = ({ label, value, handeler }: any) => {
    return (
        <div className="areafield">
            <textarea value={value} onChange={(e) => { handeler(e.target.value) }} required />

            <label >{label}</label>
        </div>
    );
}

export default TextArea;