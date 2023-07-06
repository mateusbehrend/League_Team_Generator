import { useState } from "react";
import "./style.css";

const checkListPeople = [
  "Amadeu",
  "Eric",
  "Mateus",
  "Ryan",
  "Bruce",
  "Allen",
  "Neil",
  "Ethan",
  "Haesu",
  "Yasaswi",
  "Anthony",
  "Eyaad",
  "Nash",
  "Praveen",
  "Harry",
];

const players = [
  {
    name: "Amadeu",
    preference: [15, 5, 20, 0, 60],
    value: 69,
    roleValue: [45, 30, 55, 30, 72],
  },
  {
    name: "Eric",
    preference: [2, 5, 45, 3, 45],
    value: 50,
    roleValue: [25, 25, 50, 25, 50],
  },
  {
    name: "Mateus",
    preference: [10, 20, 5, 60, 5],
    value: 72,
    roleValue: [40, 50, 40, 75, 45],
  },
  {
    name: "Ryan",
    preference: [5, 25, 10, 40, 20],
    value: 79,
    roleValue: [30, 60, 40, 80, 55],
  },
  {
    name: "Bruce",
    preference: [70, 5, 5, 5, 15],
    value: 80,
    roleValue: [83, 40, 40, 40, 55],
  },
  {
    name: "Allen",
    preference: [16, 34, 35, 5, 10],
    value: 60,
    roleValue: [50, 65, 65, 30, 40],
  },
  {
    name: "Neil",
    preference: [12, 25, 25, 18, 0],
    value: 52,
    roleValue: [50, 55, 55, 50, 30],
  },
  {
    name: "Ethan",
    preference: [20, 30, 15, 0, 15],
    value: 52,
    roleValue: [58, 58, 58, 30, 50],
  },
  {
    name: "Haesu",
    preference: [10, 30, 5, 5, 50],
    value: 72,
    roleValue: [55, 67, 40, 40, 74],
  },
  //HERE
  {
    name: "Yasaswi",
    preference: [0, 0, 15, 5, 80],
    value: 35,
    roleValue: [15, 15, 15, 15, 38],
  },
  {
    name: "Anthony",
    preference: [5, 65, 25, 0, 5],
    value: 78,
    roleValue: [50, 81, 67, 50, 40],
  },
  {
    name: "Eyaad",
    preference: [0, 0, 60, 40, 0],
    value: 58,
    roleValue: [25, 25, 65, 60, 25],
  },
  {
    name: "Nash",
    preference: [50, 10, 30, 0, 10],
    value: 65,
    roleValue: [69, 58, 63, 40, 50],
  },
  {
    name: "Praveen",
    preference: [40, 5, 2.5, 2.5, 50],
    value: 33,
    roleValue: [37, 15, 15, 15, 33],
  },
  {
    name: "Harry",
    preference: [30, 30, 30, 0, 10],
    value: 49,
    roleValue: [48, 57, 53, 30, 42],
  },
];
let start = true;
function App() {
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const tenTeams = getTeams();
  console.log(tenTeams);
  return (
    <>
      <Header />
      <main>
        <div className="submitBody">
          <GetPlayers disabled={disabled} />

          <SubmitButton
            disabled={disabled}
            setDisabled={setDisabled}
            setIsLoading={setIsLoading}
          />
        </div>

        {!start ? isLoading ? <Loader /> : <TeamTables /> : null}
        <TeamTables />
      </main>
    </>
  );
}

function Header() {
  const appTitle = "League Team Generator";
  return (
    <header className="header">
      <div className="logo">
        <img
          src="Lol_icon.png"
          height="68"
          width="68"
          alt="League of Legends Img"
        />
        <h1>{appTitle}</h1>
      </div>
    </header>
  );
}
var updatedList = [];
function GetPlayers({ disabled }) {
  const [checked, setChecked] = useState([]);
  const handleCheck = (event) => {
    updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  return (
    <aside>
      <div className="checklist">
        <div className="leagueCheckList"></div>
        <span className="checkTitle">League Players:</span>
        <div className="list-container">
          {checkListPeople.map((item, index) => (
            <div key={index}>
              <input
                className="box"
                value={item}
                type="checkbox"
                onChange={handleCheck}
                disabled={disabled}
              />
              <span className="PersonName">{item}</span>
            </div>
          ))}
        </div>
        {/* <div className="nameDisplay">{`Items checked are: ${checkedItems}`}</div> */}
      </div>
    </aside>
  );
}

function SubmitButton({ disabled, setDisabled, setIsLoading }) {
  return (
    <button
      className="submitButton"
      onClick={() =>
        updatedList.length === 10
          ? (setDisabled(true), setIsLoading(true))
          : alert("Not 10 people selected")
      }
    >
      {"Submit"}
    </button>
  );
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function getTeams() {
  var finalTenTeams = [];
  start = false;
  let fullStats = updatedList.map(function (element) {
    return players.find((search) => search.name === element);
  });
  let validOptions = [];
  //GETS 10 values within range of difference +-10
  for (let i = 0; i < 10; ) {
    let sumTeam1 = 0;
    let sumTeam2 = 0;
    let list2 = shuffle([...fullStats]); // spread to avoid mutating the original
    let list1 = list2.splice(0, fullStats.length >> 1);
    for (let i = 0; i < list1.length; i++) {
      sumTeam1 += list1[i].value;
    }
    for (let i = 0; i < list2.length; i++) {
      sumTeam2 += list2[i].value;
    }
    const difference = sumTeam1 - sumTeam2;
    //console.log(difference);
    if (difference <= 5 && difference >= -5) {
      validOptions.push([`difference:${difference}`, [...list1], [...list2]]);
      i++;
      console.log(list1, list2);
    }
  }
  const validOptionsCopy = validOptions;

  //Get Preferences
  //var topLane = Math.max.apply({}, validOptions[0].list1.preference[0]);
  //Loop through all 10 possibilites
  for (let i = 0; i < 10; i++) {
    var topLane1 = [];
    var topLane2 = [];
    //Loop through to get all Top Lane preferences
    for (let j = 0; j < 5; j++) {
      topLane1[j] = {
        topLaneValue: validOptions[i][1][j].preference[0],
        person: validOptions[i][1][j],
      };
      topLane2[j] = {
        topLaneValue: validOptions[i][2][j].preference[0],
        person: validOptions[i][2][j],
      };
    }
    const topLaneValues1 = topLane1.map((item) => item.topLaneValue);
    const topLaneValues2 = topLane2.map((item) => item.topLaneValue);
    const topLaner1Index = topLaneValues1.indexOf(Math.max(...topLaneValues1));
    const topLaner2Index = topLaneValues2.indexOf(Math.max(...topLaneValues2));

    //SET TOP LANER AND REMOVE PLAYER FROM REMAINING OPTIONS
    const topLaner1 = validOptions[i][1].splice(topLaner1Index, 1);
    const topLaner2 = validOptions[i][2].splice(topLaner2Index, 1);
    // console.log(topLaner1);
    // console.log(topLaner2);

    //SUPPORT
    var support1 = [];
    var support2 = [];
    //Loop through to get all Top Lane preferences
    for (let j = 0; j < 4; j++) {
      support1[j] = {
        supportValue: validOptions[i][1][j].preference[4],
        person: validOptions[i][1][j],
      };
      support2[j] = {
        supportValue: validOptions[i][2][j].preference[4],
        person: validOptions[i][2][j],
      };
    }
    //console.log(topLane2[0][0].topLaneValue);
    const supportValues1 = support1.map((item) => item.supportValue);
    const supportValues2 = support2.map((item) => item.supportValue);
    //console.log(topLaneValues1);
    //console.log(topLaneValues2);
    const support1Index = supportValues1.indexOf(Math.max(...supportValues1));
    const support2Index = supportValues2.indexOf(Math.max(...supportValues2));
    // console.log(topLaner1);
    // console.log(topLaner2);

    //SET TOP LANER AND REMOVE PLAYER FROM REMAINING OPTIONS
    const supportLaner1 = validOptions[i][1].splice(support1Index, 1);
    const supportLaner2 = validOptions[i][2].splice(support2Index, 1);
    // console.log(supportLaner1);
    // console.log(supportLaner2);

    //ADC
    var adc1 = [];
    var adc2 = [];
    //Loop through to get all Top Lane preferences
    for (let j = 0; j < 3; j++) {
      adc1[j] = {
        adcValue: validOptions[i][1][j].preference[3],
        person: validOptions[i][1][j],
      };
      adc2[j] = {
        adcValue: validOptions[i][2][j].preference[3],
        person: validOptions[i][2][j],
      };
    }
    const adcValues1 = adc1.map((item) => item.adcValue);
    const adcValues2 = adc2.map((item) => item.adcValue);
    const adc1Index = adcValues1.indexOf(Math.max(...adcValues1));
    const adc2Index = adcValues2.indexOf(Math.max(...adcValues2));

    //SET ADC LANER AND REMOVE PLAYER FROM REMAINING OPTIONS
    const adcLaner1 = validOptions[i][1].splice(adc1Index, 1);
    const adcLaner2 = validOptions[i][2].splice(adc2Index, 1);
    // console.log(adcLaner1);
    // console.log(adcLaner2);

    //JUNGLE
    var jg1 = [];
    var jg2 = [];
    //Loop through to get all Top Lane preferences
    for (let j = 0; j < 2; j++) {
      jg1[j] = {
        jgValue: validOptions[i][1][j].preference[1],
        person: validOptions[i][1][j],
      };
      jg2[j] = {
        jgValue: validOptions[i][2][j].preference[1],
        person: validOptions[i][2][j],
      };
    }
    const jgValues1 = jg1.map((item) => item.jgValue);
    const jgValues2 = jg2.map((item) => item.jgValue);
    const jg1Index = jgValues1.indexOf(Math.max(...jgValues1));
    const jg2Index = jgValues2.indexOf(Math.max(...jgValues2));

    //SET JG LANER AND REMOVE PLAYER FROM REMAINING OPTIONS
    const jgLaner1 = validOptions[i][1].splice(jg1Index, 1);
    const jgLaner2 = validOptions[i][2].splice(jg2Index, 1);
    // console.log(jgLaner1);
    // console.log(jgLaner2);

    //MIDLANE
    const midLaner1 = validOptions[i][1][0];
    const midLaner2 = validOptions[i][2][0];
    validOptions[i][1].splice(0, 1);
    validOptions[i][2].splice(0, 1);
    // console.log(midLaner1);
    // console.log(midLaner2);

    const team1 = [
      ...topLaner1,
      ...jgLaner1,
      midLaner1,
      ...adcLaner1,
      ...supportLaner1,
    ];
    const team2 = [
      ...topLaner2,
      ...jgLaner2,
      midLaner2,
      ...adcLaner2,
      ...supportLaner2,
    ];
    //console.log(team1);
    //console.log(team2);
    const sumPositionalDifference = calculatePositionalDifference(team1, team2);
    finalTenTeams[i] = [
      { sumPositionalDifference },
      { team1 },
      { team2 },
      { ...validOptions[i][0] },
    ];
  }
  return finalTenTeams;
}

function calculatePositionalDifference(team1, team2) {
  const sumPositions1 =
    team1[0].roleValue[0] +
    team1[1].roleValue[1] +
    team1[2].roleValue[2] +
    team1[3].roleValue[3] +
    team1[4].roleValue[4];
  const sumPositions2 =
    team2[0].roleValue[0] +
    team2[1].roleValue[1] +
    team2[2].roleValue[2] +
    team2[3].roleValue[3] +
    team2[4].roleValue[4];
  const sumPositionsDifference = sumPositions1 - sumPositions2;
  return sumPositionsDifference;
}

function Loader() {
  return <p className="loadingMessage">Loading...</p>;
}

function TeamTables({
  sumPositionalDifference,
  team1,
  team2,
  difference,
  setIsLoading,
}) {
  setIsLoading(false);
  return <p>{sumPositionalDifference}</p>;
}

export default App;
