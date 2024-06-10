import "./index.css";

const StarPeopleItems = (props) => {
  const { eachPeopleItem } = props;
  const {
    birthYear,
    eyeColor,
    gender,
    hairColor,
    height,
    mass,
    name,
    skinColor,
  } = eachPeopleItem;

  return (
    <li className="card">
      <h2>{name}</h2>
      <p>
        <strong>Height:</strong> {height}
      </p>
      <p>
        <strong>Mass:</strong> {mass}
      </p>
      <p>
        <strong>Hair Color:</strong> {hairColor}
      </p>
      <p>
        <strong>Skin Color:</strong> {skinColor}
      </p>
      <p>
        <strong>Eye Color:</strong> {eyeColor}
      </p>
      <p>
        <strong>Birth Year:</strong> {birthYear}
      </p>
      <p>
        <strong>Gender:</strong> {gender}
      </p>
    </li>
  );
};

export default StarPeopleItems;
