export default function YoutubeLinkButton(props) {
    const track_id = props.track_id;
    const handleClick = async () => {
        if (track_id == ""){
            alert("No song selected");
            return;
        } 
        const unprocessed_lyrics = await fetchLyrics(track_id);
    };
    return (
        <button onClick={handleClick}>Get Lyrics</button>
    );
}

async function fetchLyrics(track_id){
    const response = await fetch(`https://spot-api.ethantest.workers.dev/lyrics/${track_id}`);
    const data = await response.json();
    console.log(data);
    return data;

}