const EntryCard = ({ entry }) => {
    return (
        <div>
            <h1>{entry.title}</h1>
            <p>{entry.content}</p>
        </div>
    );
};

export default EntryCard;
