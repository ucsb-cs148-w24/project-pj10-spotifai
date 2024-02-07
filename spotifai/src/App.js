import WorldMapChart from './components/DemographicMap.jsx';
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";
import './App.css';

function App() {
  const [{ token }, dispatch] = useStateProvider();
  
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
      }
    }
    document.title = "Spotify";
  }, [dispatch, token]);

  return (
    <div className="App">
      <div style = {{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        flexDirection: 'column',
      }}
      >
        <div
          style = {{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
          }}
        >
          <div
            style = {{
              backgroundColor: 'yellow',
              flexGrow: 1,
            }}
          >
            {/* insert ai image component*/}
          </div>
          <div
            style = {{
              backgroundColor: 'green',
              flexGrow: 2.5,
            }}
          >
            {/* beat visualizer */}
          </div>
        </div>
        <div
          style = {{
            flexGrow: 4,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div
            style = {{
              backgroundColor: 'green',
              flexGrow: 1,
            }}
          >
            {/* playlist component */}
          </div>
          <div
            style = {{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 2.5,
            }}
          >
            <div
              style = {{
                flexGrow: 2,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <div
                style = {{
                  backgroundColor: 'blue',
                  flexGrow: 2,
                }}
              >
                {/* current song component */}
              </div>
              <div 
                style = {{
                  backgroundColor: 'purple',
                  flexGrow: 1,
                }}
              >
                <WorldMapChart/>
              </div>
            </div>
            <div
              style = {{
                backgroundColor: 'pink',
                flexGrow: 1,
              }}
            >
              {/* lyric analysis component */}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;

