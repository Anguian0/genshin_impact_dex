import "./App.css";
// import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";
import { useEffect } from "react";

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
      setGenshinState({ types: [...genshinState.types], [item]: respJson });
    }

    // setGenshinState({
    //   type
    //   // types: types
    // });
  };

  useEffect(() => {
    fetchGenshinApi("types");
  }, []);

  const handleChangeType = ({ target }) => {
    const url = `https://api.genshin.dev/${target.value}`;
    fetchGenshinApi(target.value, url);
  };

  return (
    <div className="App">
      <video
        // src="/genshin.mp4"
        src="https://genshin.hoyoverse.com/_nuxt/videos/3e78e80.mp4"
        id="video"
        autoPlay={true}
        muted={true}
        loop={true}
      ></video>
      <div className="text-center container card shadow-lg">
        <img className="align-middle pb-3 w-75 mx-auto" src="/logo.png" alt=""/>
        {/* <h1 className="fw-bold text-light align-middle">
          <i className="bi bi-controller"></i> Genshin impact
        </h1> */}
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

        {genshinState.artifacts && (
          <select name="artifacts" className="form-select mt-2">
            <option value="">Selecciona un set de artefactos</option>
            {genshinState.artifacts.map((artifact) => (
              <option key={artifact} value={artifact}>
                {artifact}
              </option>
            ))}
          </select>
        )}

        {genshinState.boss && (
          <select name="boss" className="form-select mt-2">
            <option value="">Selecciona un jefe</option>
            {genshinState.boss.map((bos) => (
              <option key={bos} value={bos}>
                {bos}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>

    //
    //
  );
}

export default App;
