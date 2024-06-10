import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import StarPeopleItems from "../StarPeopleItems";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import "./index.css";

class Home extends Component {
  state = {
    startPeopleList: [],
    isLoading: true,
    apiUrl: "https://swapi.dev/api/people",
    previousUrl: null,
    nextUrl: null,
  };

  componentDidMount() {
    this.getStarPeopleList();
  }

  getStarPeopleList = async () => {
    const { apiUrl } = this.state;

    const response = await fetch(apiUrl);

    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.results.map((eachItem) => ({
        name: eachItem.name,
        height: eachItem.height,
        mass: eachItem.mass,
        hairColor: eachItem.hair_color,
        skinColor: eachItem.skin_color,
        eyeColor: eachItem.eye_color,
        birthYear: eachItem.birth_year,
        gender: eachItem.gender,
      }));
      this.setState({
        startPeopleList: updatedData,
        isLoading: false,
        previousUrl: fetchedData.previous,
        nextUrl: fetchedData.next,
      });
    }
  };

  handlePreviousFun = async () => {
    const { previousUrl } = this.state;
    if (previousUrl) {
      this.setState(
        { apiUrl: previousUrl, isLoading: true },
        this.getStarPeopleList
      );
    }
  };

  handleNextFun = async () => {
    const { nextUrl } = this.state;
    if (nextUrl) {
      this.setState(
        { apiUrl: nextUrl, isLoading: true },
        this.getStarPeopleList
      );
    }
  };

  render() {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === undefined) {
      return <Navigate to="/login" />;
    }
    const { startPeopleList, isLoading } = this.state;
    return (
      <div className="bg-container">
        {isLoading ? (
          <div className="products-loader-container">
            <ThreeDots
              type="ThreeDots"
              color="#0b69ff"
              height="50"
              width="50"
            />
          </div>
        ) : (
          <ul className="cards-list">
            {startPeopleList.map((eachItem) => (
              <StarPeopleItems key={eachItem.name} eachPeopleItem={eachItem} />
            ))}
          </ul>
        )}
        <div className="button-container">
          <button className="button-previous" onClick={this.handlePreviousFun}>
            Previous
          </button>
          <button className="button-next" onClick={this.handleNextFun}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
