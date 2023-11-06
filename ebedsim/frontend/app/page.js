'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [ebedlist, setEbedlist] = useState([]);
  const [fozes, setFozes] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/ebeds').then((response) => {
      const formattedData = response.data.map((item) => {
        return {
          ...item,
          created_at: new Date(item.created_at).toLocaleString(),
        };
      });

      setEbedlist(formattedData);
    });
  }, []);

  function etelGeneralas() {
    try {
      axios
        .get('http://127.0.0.1:8000/generate-meals')
        .then((response) => {
          setFozes(response.data);
        })
        .catch((error) => {
          console.error('Hiba történt a GET kérés során:', error);
        });
    } catch (error) {
      console.error('Hiba történt:', error);
    }
  }

  function generaltHetNapjai() {
    const currentDate = new Date();
    const previous7Dates = [];
    const next7Dates = [];

    // előző 7 nap
    for (let i = 1; i <= 7; i++) {
      const previousDate = new Date(currentDate);
      previousDate.setDate(currentDate.getDate() - i);
      previous7Dates.push(previousDate);
    }

    // fordított sorrendben megjelenítés
    previous7Dates.reverse();

    // következő 7 nap
    for (let i = 1; i <= 7; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      next7Dates.push(nextDate);
    }

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return (
      <div>
        <p>Előző 7 nap</p>
        {previous7Dates.map((date) => {
          return (
            <div key={date.toISOString().slice(0, 10)}>
              {date.toLocaleDateString('hu-HU', options)}
            </div>
          );
        })}
        <p>Mai Nap: {currentDate.toLocaleDateString('hu-HU', options)}</p>
        <p>Következő 7 nap</p>
        {next7Dates.map((date) => {
          return (
            <div key={date.toISOString().slice(0, 10)}>
              {date.toLocaleDateString('hu-HU', options)}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <main>
      <p>{generaltHetNapjai()}</p>
      <button onClick={etelGeneralas}>A kovetkezo 7 nap elkeszitese</button>
    </main>
  );
}
