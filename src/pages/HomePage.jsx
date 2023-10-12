import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://ih-countries-api.herokuapp.com/countries")
      .then((response) => {
        console.log(response);
        setCountries(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <h3>WikiCountries: Your Guide to the World</h3>

      <div className="list-group">
        {countries.map((country) => {
          return (
            <Link
                to={`/${country.alpha3Code}`}
              key={country._id}
              className="list-group-item list-group-item-action"
            >
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                alt=""
              />
              <span>{country.name.common}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
