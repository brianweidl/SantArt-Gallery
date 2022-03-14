import React from "react";
import "./AddArtistForm.css";
import { addNewArtist } from "../../../redux/actions/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import imgUser from "../../../assets/img/user.png";
import logo from "../../../assets/img/SantArtlogo.png";


const ModalAddArtist = (setOpenModalArtist) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    biography: "",
    photo: "",
    email: "",
    location: "",
  });

  console.log(input);
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value, //va tomando el nombre de cada prop, me vaya llenando el estado
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addNewArtist(input));
    
    navigate("/artists");
    setInput({
      name: "",
      biography: "",
      photo: "",
      email: "",
      location: "",
    });

    
  }
  return (
    <>
      <div className="artists-box">
        <div className="img-container"></div>
        <div className="info-box">
          <div className="profile-logo">
            <img src={logo} height="70rem" alt="imgUser" />
          </div>
          <div className="data-box">
            <form key="form" onSubmit={(e) => handleSubmit(e)}>
              <div>
                {input.photo && input.photo.startsWith("http") ? (
                  <img src={input.photo} className="imgRedonda" alt="imgUser" />
                ) : (
                  <img src={imgUser} height="100rem" alt="imgUser" />
                )}
              </div>

              <label> Photo :</label>
              <input
                type="text"
                autoComplete="off"
                key="photo"
                className="input-addartist"
                required
                value={input.photo}
                name="photo"
                onChange={handleChange}
              />

              <label> Name: </label>
              <input
                type="text"
                autoComplete="off"
                key="name"
                className="input-addartist"
                required
                value={input.name}
                name="name"
                onChange={handleChange}
              />

              <label> Email: </label>
              <input
                type="text"
                autoComplete="off"
                key="email"
                className="input-addartist"
                required
                value={input.email}
                name="email"
                onChange={handleChange}
              />

              <label> Location: </label>
              <select
                name="location"
                onChange={handleChange}
                className="input-addartist"
              >
                <option value="Elegir" id="AF">
                  Elegir opción
                </option>
                <option value="Afganistán" id="AF">
                  Afganistán
                </option>
                <option value="Albania" id="AL">
                  Albania
                </option>
                <option value="Alemania" id="DE">
                  Alemania
                </option>
                <option value="Andorra" id="AD">
                  Andorra
                </option>
                <option value="Angola" id="AO">
                  Angola
                </option>
                <option value="Anguila" id="AI">
                  Anguila
                </option>
                <option value="Antártida" id="AQ">
                  Antártida
                </option>
                <option value="Antigua y Barbuda" id="AG">
                  Antigua y Barbuda
                </option>
                <option value="Antillas holandesas" id="AN">
                  Antillas holandesas
                </option>
                <option value="Arabia Saudí" id="SA">
                  Arabia Saudí
                </option>
                <option value="Argelia" id="DZ">
                  Argelia
                </option>
                <option value="Argentina" id="AR">
                  Argentina
                </option>
                <option value="Armenia" id="AM">
                  Armenia
                </option>
                <option value="Aruba" id="AW">
                  Aruba
                </option>
                <option value="Australia" id="AU">
                  Australia
                </option>
                <option value="Austria" id="AT">
                  Austria
                </option>
                <option value="Azerbaiyán" id="AZ">
                  Azerbaiyán
                </option>
                <option value="Bahamas" id="BS">
                  Bahamas
                </option>
                <option value="Bahrein" id="BH">
                  Bahrein
                </option>
                <option value="Bangladesh" id="BD">
                  Bangladesh
                </option>
                <option value="Barbados" id="BB">
                  Barbados
                </option>
                <option value="Bélgica" id="BE">
                  Bélgica
                </option>
                <option value="Belice" id="BZ">
                  Belice
                </option>
              </select>

              <label> Biography: </label>
              <textarea
                name="biography"
                key="biography"
                className="input-addartist"
                value={input.biography}
                onChange={handleChange}
              />
              <div>
                <button className="btn-create">CREATE</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalAddArtist;