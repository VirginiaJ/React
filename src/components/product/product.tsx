import React from "react";
import { RouteComponentProps } from "react-router-dom";

type TParams = { id: string };
export default function Product({ match }: RouteComponentProps<TParams>) {
  return <p>Product info {match.params.id}</p>;
}
