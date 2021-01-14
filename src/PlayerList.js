import React from "react";

function PlayerList(props) {
  const { list } = props;

  if (!list) {
    return <h1>Loading...</h1>;
  } else {
    return list.data.map((player, index) => {
      return (
        <ul key={index}>
          <li key={index}>{player.first_name + ' ' + player.last_name}</li>
        </ul>
      );
    });
  }
}

export default PlayerList;
