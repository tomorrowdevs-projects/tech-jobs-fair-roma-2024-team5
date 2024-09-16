import './CircularCheckBox.css'

export default function CircularCheckBox({id, children, ...props}) {
  return <div className="circular-checkbox">
    <input id={id} {...props} type='checkbox'></input><label htmlFor={id}>{children}</label>
  </div>
}