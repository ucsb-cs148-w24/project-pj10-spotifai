import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function YoutubeLinkButton(props) {
    const query = props.query;
    const key = props.api_key;
    const handleClick = async () => {
        if (query == ""){
            alert("No song selected");
            return;
        } 
        const youtubeURL = await fetchYoutubeURL(query, key);
        window.open(`https://www.youtube.com/watch?v=${youtubeURL}`, "_blank");
    };
    return (
        <button onClick={handleClick} style={{ backgroundColor: 'rgb(60, 97, 60)', color: 'white', fontSize: '16px', padding: '10px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer' }}>
            Open Song in Youtube
            <FontAwesomeIcon icon={faYoutube} />
        </button>
    );
}
async function fetchYoutubeURL(query, key){
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&key=${key}`);
    const data = await response.json();
    return data.items[0].id.videoId;

}