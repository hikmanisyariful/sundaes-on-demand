import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";

import ScoopOption from "./ScoopOption";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        // TODO: handle error message
      });
  }, [optionType]);

  // TODO: replace `null` with ToppingOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOption : null;

  // const OptionItems = items.map((item) => (
  //   <ItemComponent
  //     key={item.name}
  //     name={item.name}
  //     imagePath={item.imagePath}
  //   />
  // ));

  return (
    <Row>
      {/* <OptionItems /> */}
      {items.map((item) => {
        return (
          <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
          />
        );
      })}
    </Row>
  );
}
