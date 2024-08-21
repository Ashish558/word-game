import React, { useState, useContext, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import styles from "./selectLetters.module.css";
import { GameContext, GameContextProps } from "../../providers/Provider";
import LetterCard from "../LetterCard/LetterCard";
import { LetterPoint } from "../../types/types";
import Socket from "../../utils/Socket";

// A little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: LetterPoint[],
  destination: LetterPoint[],
  droppableSource: { index: number; droppableId: string },
  droppableDestination: { index: number; droppableId: string }
): { [key: string]: LetterPoint[] } => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [key: string]: LetterPoint[] } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // Some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `0 ${grid}px 0 0`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
  // Change background colour if dragging
  background: isDragging ? "#fff" : "#fff",
  boxShadow: "rgba(149, 157, 165, 0.4) 0px 8px 24px",
  // Styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "transparent" : "transparent",
  display: "flex",
  padding: grid,
  height: "90px",
  width: "583px",
});

interface Item {
  id: string;
  letter: string;
  score: number;
  multiplier: number;
}

const SelectLetters: React.FC = () => {
  const { round, items, setItems } = useContext(
    GameContext
  ) as GameContextProps;

  useEffect(() => {
    let letters = round.letters.map((item, index) => ({
      ...item,
      id: index,
    }));
    setItems([[], letters]);
  }, [round.letters]);

  const onDragEnd = (result: DropResult) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    const sInd = +result.source.droppableId;
    const dInd = +result.destination.droppableId;

    if (sInd === dInd) {
      const updatedItems = reorder(
        items[sInd],
        result.source.index,
        result.destination.index
      );
      const newItems = [...items];
      newItems[sInd] = updatedItems;
      setItems(newItems);
    } else {
      const result1 = move(
        items[sInd],
        items[dInd],
        result.source,
        result.destination
      );
      const newItems = [...items];
      newItems[sInd] = result1[sInd];
      newItems[dInd] = result1[dInd];

      setItems(newItems.filter((group) => group.length));
    }
  };

  const handleClick = (item: LetterPoint) => {
    let newItems = [...items];
    let sourceIndex = -1;
    let destinationIndex = -1;
    if (newItems[1] === undefined) newItems.push([]);
    // Check if the item exists in the first array
    const foundInFirstArray = newItems[0].findIndex((i) => i.id === item.id);
    const foundInSecondArray = newItems[1].findIndex((i) => i.id === item.id);
    if (foundInFirstArray !== -1) {
      sourceIndex = 0;
      destinationIndex = 1;
    } else {
      // Check if the item exists in the second array
      if (foundInSecondArray !== -1) {
        sourceIndex = 1;
        destinationIndex = 0;
      }
    }

    if (sourceIndex !== -1 && destinationIndex !== -1) {
      const [removed] = newItems[sourceIndex].splice(
        foundInFirstArray !== -1 ? foundInFirstArray : foundInSecondArray,
        1
      );
      newItems[destinationIndex].push(removed);
      setItems(newItems);
    }
  };

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        {items.map((el, ind) => (
          <Droppable key={ind} droppableId={`${ind}`} direction="horizontal">
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot
            ) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {el.map((item, index) => (
                  <Draggable
                    key={`${item.id}`}
                    draggableId={`${item.id}`}
                    index={index}
                  >
                    {(
                      provided: DraggableProvided,
                      snapshot: DraggableStateSnapshot
                    ) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        className={styles.letter}
                        onClick={() => handleClick(item)}
                      >
                        <p className={styles.text}>{item.letter}</p>
                        <div className={styles["letter-bottom"]}>
                          <p className={styles["letter-score"]}>{item.score}</p>
                          {item.multiplier > 1 && <p className={styles["letter-multiplier"]}>x {item.multiplier}</p>}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default SelectLetters;
