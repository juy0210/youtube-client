import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch } from "react-redux";
import {
  createComment,
  modifyComment,
  removeComment,
} from "../store/commentSlice";
import { updateComment } from "../api/comment";

const Comment = ({ comment, videoCode }) => {
  const dispatch = useDispatch();
  const { id } = useAuth();
  const [newReply, setNewReply] = useState({
    commentCode: 0,
    commentText: "",
    videoCode: videoCode,
    id: id,
    parentCode: 0,
  });
  // 댓글 수정
  const [isEdit, setIsEdit] = useState(false);

  // 대댓글 추가
  const addReply = () => {
    dispatch(createComment(newReply));
    setNewReply({ ...newReply, commentText: "", parentCode: 0 });
  };

  // 댓글 삭제
  const deleteComment = (commentCode) => {
    dispatch(removeComment({ videoCode, commentCode })); // 명칭이 동일하면 생략 가능
  };

  // 댓글 수정 - id가 작성자 본인일 경우 수정 가능하게
  const edit = (commentId, commentText) => {
    if (id === commentId) {
      setIsEdit(true);
      setNewReply({ ...newReply, commentText });
    }
  };

  const editCancle = () => {
    setIsEdit(false);
    setNewReply({ ...newReply, commentText: "", commentCode: 0 });
  };

  const editSubmit = () => {
    dispatch(modifyComment(newReply));
    editCancle();
  };

  return (
    <div className="comment-context">
      <h4>{comment.id}</h4>
      {isEdit ? (
        <>
          <input
            type="text"
            value={newReply.commentText}
            onChange={(e) =>
              setNewReply({
                ...newReply,
                commentText: e.target.value,
                commentCode: comment.commentCode,
              })
            }
          />
          <div className="edit-content">
            <button onClick={editCancle}>취소</button>
            <button onClick={editSubmit}>수정</button>
          </div>
        </>
      ) : (
        <p onClick={() => edit(comment.id, comment.commentText)}>
          {comment.commentText}
        </p>
      )}
      <button
        onClick={() =>
          setNewReply({
            ...newReply,
            parentCode: comment.commentCode,
          })
        }
      >
        답글
      </button>
      /* 댓글 작성자 본인인 경우에 삭제 */
      {id === comment.id && (
        <button onClick={() => deleteComment(comment.commentCode)}>삭제</button>
      )}
      {newReply.parentCode === comment.commentCode && (
        <>
          <input
            type="text"
            placeholder="답글 추가.."
            value={newReply.commentText}
            onChange={() =>
              setNewReply({
                ...newReply,
                commentText: e.target.value,
              })
            }
          />
          <div className="reply-add-status">
            <button
              onClick={() =>
                setNewReply({
                  ...newReply,
                  commentText: "",
                  parentCode: 0,
                })
              }
            >
              취소
            </button>
            <button onClick={addReply}>답글</button>
          </div>
        </>
      )}
      {comment.replies?.map((reply) => (
        <Comment
          comment={reply}
          videoCode={videoCode}
          key={reply.commentCode}
        />
      ))}
    </div>
  );
};
