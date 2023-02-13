const Filter = ({ searchFilter, setSearchFilter }) => {
  return (
    <div>
      filter shown with
      <input
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
      />
    </div>
  )
}
export default Filter
