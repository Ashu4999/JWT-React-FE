export default function LoadingButton({ isLoading, buttonTitle, isFormValid }) {
    return (
        isLoading
            ? <div className="loader-div">
                <p className="loader" style={{ width: "30px", height: "30px" }}></p>
            </div>
            : <button disabled={!isFormValid}>{buttonTitle}</button>
    );
}