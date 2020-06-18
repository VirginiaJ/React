import React from "react";

export default function Product(props: any) {
  return <p>Product info {props.match.params.id}</p>;
}
