"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./Grid.css";
import Popup from "./Popup/Popup";

type GridProps = {
  uniqueNumber?: number[];
  generatedNumber?: number;
  isNumberCallBack: boolean;
  data : any[]
};

const Grid: React.FC<GridProps> = ({ isNumberCallBack, data }) => {

  const [isChecked, setIsChecked] = useState<boolean[]>([]);
  const [grids, setGrids] = useState<any[]>(data); // Ensure grids is a typed number array
  const [uniqueNumber, setUniqueNumber] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const tblLetter = useRef<HTMLDivElement | any>(null);

  const winningPositions = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
  ];


  useEffect(() => {
    checkWinningCondition();
    if (winningIterator === 5) {
      setShowPopup(true);
    }
  }, [isChecked]);

  let winningIterator = 0;
  const generateRandomNumber = () => {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * 100) + 1;
    } while (!grids.includes(newNumber));

    const index = grids.indexOf(newNumber);
    const newChecked = [...isChecked];
    newChecked[index] = true;
    setIsChecked(newChecked);
    setUniqueNumber(newNumber);
  };

 

  const checkWinningCondition = () => {
    return winningPositions.some((combination, index) => {
      let ite = 0;
      if (combination.every((index) => isChecked[index])) {
        ite += 1;
        const letter = tblLetter.current?.children;
        letter[winningIterator].classList.add("show-Bingo");
        winningIterator++;
      }

      // Remove the winning combination from the array
      if (ite === 5) {
        winningPositions.splice(index, 1);
      }
    });
  };

  const resetGame = () => {
    window.location.reload();
  };
  function handleCheckboxChange(index: number): void {
    setIsChecked((prevChecked) => ({
      ...prevChecked,
      [index]: !prevChecked[index],
    }));
  }

  return (
    <div className="BingoBox">
      <div className="flex flex-col text-center my-4 w-full px-4">
        <h1 className="text-3xl font-semibold my-4">Take a Bingo Break</h1>

        <div className="numberBox h-[40px] flex items-center justify-center">
          <span className="text-2xl">{uniqueNumber}</span>
        </div>
        <div className="my-4">
          <div className="grid grid-cols-5 grid-rows-5 gap-2 wrapper text-center">
            {grids.map((number, index) => (
              <>
                <div
                  key={index}
                  id={`box-${index}`}
                  className="gridBox relative border-2 rounded-lg flex items-center justify-center hover:bg-gray-200"
                >
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    className="hidden"
                    checked={isChecked[index]}
                    onChange={() => handleCheckboxChange(index)} // Efficiently access state
                  />
                  {isChecked[index] && ( // Show overlay only when checked
                    <Image
                      src="/cross-sign.png" // Replace with your overlay image path
                      alt="checked"
                      width={28}
                      height={28}
                      className="absolute" // Position the overlay image
                    />
                  )}
                  <label
                    htmlFor={`checkbox-${index}`}
                    className="flex-1 px-4 py-4 cursor-pointer"
                  >
                    {number}
                  </label>
                </div>
              </>
            ))}
          </div>
          <div className="tblLetter" ref={tblLetter}>
            <span className="tblLetterSpan">B</span>
            <span className="tblLetterSpan">I</span>
            <span className="tblLetterSpan">N</span>
            <span className="tblLetterSpan">G</span>
            <span className="tblLetterSpan">O</span>
          </div>
        </div>
      </div>

      {isNumberCallBack && (
        <div className="bottom-2 mx-4">
          <button
            className="w-full bg-green-800 text-white p-2 rounded-md"
            onClick={generateRandomNumber}
          >
            Make a Call
          </button>
        </div>
      )}

      <Popup show={showPopup} onClose={resetGame} />
    </div>
  );
};

export default Grid;
