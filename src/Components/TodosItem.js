import React, { useState, useRef } from "react";

const TodosItem = ({ onEdit, onRemove, author, todos, create_date, id }) => {
  // isEdit: 수정중인지 확인하는 변수 - Boolean
  const [isEdit, setIsEdit] = useState(false);
  // toggleIsEdit(): isEdit을 반전시키는 함수
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  // localContent: 수정중일때 textarea의 데이터를 처리하기 위한 state
  const [localContent, setLocalContent] = useState(todos);
  const InputLocalContent = useRef();

  // handleQuitEdit(): 수정중일때 만약 수정 취소를 눌렀을 때 처리 되는 함수
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(todos);
  };

  // handleRemove(): todos remove 시키는 함수
  const handleRemove = () => {
    if (window.confirm("정말 삭제 할까요?")) {
      onRemove(id);
    }
  };

  // handleEdit() : todos edit 시키는 함수
  const handleEdit = (e) => {
    // 만약 수정중인 textarea의 데이터의 길이가 5 이하라면
    if (localContent.length <= 5) {
      // textarea element에 focus를 해줍니다.
      InputLocalContent.current.focus();

      return;
    }

    if (window.confirm(`${id}번 데이터를 수정 하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
    console.log(localContent);
  };

  return (
    <div className="todos-item">
      <div className="info">
        <span> Author: {author} </span> <br />
        <span className="create-at">
          Create_at: {new Date(create_date).toLocaleDateString()}
        </span>
      </div>
      <div className="content">
        {/* isEdit을 확인하여 */}
        {isEdit ? (
          /* 만약 true라면 textarea, 수정 취소 버튼, 수정 완료 버튼을 띄워줍니다. */
          <>
            <textarea
              ref={InputLocalContent}
              value={localContent}
              onChange={(e) => {
                setLocalContent(e.target.value);
              }}
            />
            <br />
            <br />
            <button onClick={handleQuitEdit}>수정 취소</button>
            <button onClick={handleEdit}>수정 완료</button>
          </>
        ) : (
          /* 만약 false 이라면 todos, 삭제하기 버튼, 수정하기 버튼을 띄워줍니다. */
          <>
            <span>{todos}</span>
            <br />
            <br />
            <button onClick={handleRemove}>삭제 하기</button>
            <button onClick={toggleIsEdit}>수정 하기</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodosItem;
