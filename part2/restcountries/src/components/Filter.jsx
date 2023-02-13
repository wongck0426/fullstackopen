const Filter = ({ searchFilter, setSearchFilter }) => {
  return (
    <div>
      find countries
      <input
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
      />
    </div>
  )
}
export default Filter
