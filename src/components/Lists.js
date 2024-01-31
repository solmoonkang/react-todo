import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import List from './List';

const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {

    const handleEnd = (result) => {
        if (!result.destination) return;
        const newTodoData = todoData;

        // 1. 변경시키는 아이템을 배열에서 제거한다.
        // 2. return 값으로 제거된 아이템을 잡아준다.
        const [reorderedItem] = newTodoData.splice(result.source.index, 1);

        // 원하는 자리에 reorderItem을 insert 해준다.
        newTodoData.splice(result.destination.index, 0, reorderedItem);
        setTodoData(newTodoData);
        localStorage.setItem("todoData", JSON.stringify(newTodoData));
    }

    return (
        <div>
            <DragDropContext onDragEnd={handleEnd}>
                <Droppable droppableId="to-dos">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                        {todoData.map((data, index) => (
                            <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                                {(provided, snapshot) => (
                                    <List 
                                    handleClick={handleClick}
                                    key={data.id} 
                                    id={data.id} 
                                    title={data.title} 
                                    completed={data.completed} 
                                    todoData={todoData} 
                                    setTodoData={setTodoData}
                                    provided={provided} 
                                    snapshot={snapshot} />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </DragDropContext>
        </div>
    );
});

export default Lists;
