import '../assets/Styles/ImageInput.css'

const ImageInput = ({ handeler, image, required }: any) => {
    return (
        <div className="image-input">
            <label >Image {required ? "(required)" : "(optional)"}:</label>
            <input type="file" name="questionimage" className="upload-button" onChange={(e) => { handeler(e.target.files ? e.target.files[0] : null) }} />
        </div>
    );
}

export default ImageInput;