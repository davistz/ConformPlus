import React from "react";
import { useNotification } from "../../NotificationContext";

const NotificationList = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-5 right-5 space-y-2">
      {notifications.map(({ id, message, type }) => (
        <div
          key={id}
          className={`p-4 rounded-md shadow-lg ${
            type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <p>{message}</p>
          <button onClick={() => removeNotification(id)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
