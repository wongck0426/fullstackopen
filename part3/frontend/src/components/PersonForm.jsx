const PersonForm = ({
  newName,
  setNewName,
  newPhone,
  setNewPhone,
  handleSubmit,
}) => {
  return (
    <div>
      <h2>add a new </h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:
          <input
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}
export default PersonForm
