const FillerComponent = () => {
    const date = new Date();
    return (<div>
        This is a test app created for practice. {date.toDateString()}
    </div>);
}

export default FillerComponent;
