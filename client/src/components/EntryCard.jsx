import GeneralContainer from './ui/GeneralContainer.jsx'
const EntryCard = ({ entry }) => {
    return (
        <GeneralContainer>
            <div>
                <h1>{entry.title}</h1>
                <p>{entry.content}</p>
            </div>

        </GeneralContainer>
    );
};

export default EntryCard;
