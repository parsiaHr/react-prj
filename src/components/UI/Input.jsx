
const Input = ({label , id , ...props}) => {
  return (
    <div className="control">
        <label htmlFor={id}>{label}</label>
        <input type="text" id={id} name={id} {...props} required />
    </div>
  )
}

export default Input