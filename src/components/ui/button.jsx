export function Button({ children, onClick }) {
    return (
      <button className="bg-purple-700 text-white px-4 py-2 rounded-md" onClick={onClick}>
        {children}
      </button>
    );
  }
  