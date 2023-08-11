import { useState } from "react";
import "./App.css";
import CardForm from "./components/Card";

function Add() {
  return (
    <>
      <p>Add new event to your timeline</p>
      <div>
        <CardForm />
      </div>
      <div className="card"></div>
    </>
  );
}

export default Add;
