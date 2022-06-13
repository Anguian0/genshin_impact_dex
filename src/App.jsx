import "./App.css";
// import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";

const tipos = {
  artifacts: "Artefactos",
  boss: "Jefes",
  characters: "Personajes",
  consumables: "Objetos Consumibles",
  domains: "Dominios",
  elements: "Elementos",
  enemies: "Enemigos",
  materials: "Materiales",
  nations: "Naciones",
  weapons: "Armas",
};

function App() {
  const [genshinState, setGenshinState] = useState({
    types: [],
  });

  const fetchGenshinApi = async (item, url = "https://api.genshin.dev/") => {
    const respuesta = await fetch(url);
    const respJson = await respuesta.json();

    if (item === "types") {
      setGenshinState({
        ...genshinState,
        types: respJson.types,
      });
    } else {
      setGenshinState({
        [item]: respJson,
      });
    }

    // setGenshinState({
    //   type
    //   // types: types
    // });
    
  };
  fetchGenshinApi("types");

  const handleChangeType = ({ target }) => {
    const url = `https://api.genshin.dev/${target.value}`;
  };

  return (
    <div className="App">
      <video
        // src="/genshin.mp4"
        src="https://genshin.hoyoverse.com/_nuxt/videos/3e78e80.mp4"
        id="video"
        autoplay="true"
        muted="true"
        loop="true"
      ></video>
      <div className="text-center container card shadow-lg">
        <h1 className="fw-bold text-light align-middle">
          <i class="bi bi-controller"></i> Genshin impact
        </h1>
        <select
          className="form-select"
          name="types"
          onChange={handleChangeType}
        >
          <option value="">Selecciona una opción</option>
          {genshinState.types.map((type) => (
            <option key={type} value={type}>
              {tipos[type]}
            </option>
          ))}
        </select>
      </div>
    </div>

    //
    //
  );
}

export default App;
