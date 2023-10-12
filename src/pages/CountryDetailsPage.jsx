import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CountryDetailsPage = () => {
  const { countryId } = useParams();

  const [country, setCountry] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then((response) => {
        console.log(response);
        setCountry(response.data);
        setFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [countryId]);

  return (
    <div>
      {fetching && <p>Loading...</p>}
        {country &&
        
          <div className="container">
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              Country Details
            </p>
            <h1>{country.name.common}</h1>
            <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                alt="country flag"
              />

            <table className="table">
              <thead></thead>
              <tbody>
                <tr>
                  <td style={{width: "30%"}}>Capital</td>
                  <td>{country.capital}</td>
                </tr>
                <tr>
                  <td>Area</td>
                  <td>
                    {`${country.area} km`}
                    <sup>2</sup>
                  </td>
                </tr>
                <tr>
                  <td>Borders</td>
                  <td>
                    <ul>
                      {country.borders.map((border) => {
                        return <li><Link to={`/${border}`}>{border}</Link></li>;
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        
        }
        
      
    </div>
  );
}

export default CountryDetailsPage;
