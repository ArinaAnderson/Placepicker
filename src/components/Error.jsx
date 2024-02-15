const Error = ({ title, message, onConfirm, sendRequest }) => {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div id="confirmation-actions">
          <button onClick={onConfirm} className="button">
            Okay
          </button>
          <button onClick={sendRequest} className="button">
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

export default Error;
