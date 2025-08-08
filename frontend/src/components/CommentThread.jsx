import { Link } from "react-router-dom";
import { CommentForm } from "./CommentForm";
import { useState } from "react";

const buildCommentTree = (comments) => {
  const map = {};
  const roots = [];

  comments.forEach((c) => {
    map[c._id] = { ...c, children: [] };
  });

  comments.forEach((c) => {
    if (c.parentId) {
      map[c.parentId]?.children.push(map[c._id]);
    } else {
      roots.push(map[c._id]);
    }
  });

  return roots;
};

const CommentItem = ({ comment, level = 0 }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const indent = Math.min(level, 5) * 4;
  const isChapter = !!comment.chapterOrder;

  return (
    <li
      style={{ marginLeft: `${indent * 2}px` }}
      className="bg-gray-100 p-2 rounded mb-2"
    >
      {isChapter && (
        <Link
          to={`/novels/${comment.novelId}/chapter/${comment.chapterId}`}
          className="text-sm font-medium text-blue-600 mt-1 mb-2 block hover:underline"
        >
          📘 Chapter {comment.chapterOrder}
        </Link>
      )}
      <div className="font-semibold">{comment.username}</div>
      <div className="text-sm text-gray-500 mb-1">
        {new Date(comment.createdAt).toISOString().split("T")[0]}
      </div>
      <div>{comment.content}</div>
      <div className="mt-2">
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-xs text-blue-500 hover:underline"
        >
          {showReplyForm ? "Cancel" : "Reply"}
        </button>
        {showReplyForm && (
          <div className="mt-2">
            <CommentForm
              novelId={comment.novelId}
              chapterId={comment.chapterId}
              parentId={comment._id}
              onSuccess={() => setShowReplyForm(false)} // <-- collapse after submit
            />
          </div>
        )}
      </div>
      {comment.children.length > 0 && (
        <div className="mt-2">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-xs text-blue-500 hover:underline"
          >
            {showReplies
              ? "Hide Replies"
              : `Show Replies (${comment.children.length})`}
          </button>
          {showReplies && (
            <ul>
              {comment.children.map((child) => (
                <CommentItem
                  key={child._id}
                  comment={child}
                  level={level + 1}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  );
};

const CommentThread = ({ comments }) => {
  const tree = buildCommentTree(comments || []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      <ul>
        {tree.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </ul>
    </div>
  );
};

export default CommentThread;
