import React from "react";

export function InputField(
  { type, value, onChange, comment, label, placeholder, className }:
    { type: string, value: string, onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void, comment?: string, label: string, placeholder: string, className?: string }
) {

  let error = 1;
  if (!comment) {
    error = 0;
    comment = '\u200B'
  }

  return (
    <div className={className || ""}>
      <div className="p-1">
        <span className="text-lg font-bold mb-2">{label}</span>
        <br />
        <input
          className={"transition transition-all duration-300 float-right px-2 py-1 outline outline-2 rounded-lg " + (error ? "outline-red-300 focus:outline-red-400" : "outline-gray-300 focus:outline-main-300")}
          type={type}
          value={value}
          placeholder={placeholder || ""}
          onChange={onChange}
        />
      </div> <br />
      <span className="test-md h-4 text-red-500">{comment || ""}</span>
    </div>
  )
}

export function SubmitButton({ message, type, value, disabled }: { message?: string, type?: string, value?: string, disabled?: boolean }) {
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);

  const handleButtonClick = () => {
    setIsAlertVisible(true);
  }

  setTimeout(() => {
    setIsAlertVisible(false);
  }, 4000);
  const styles = {
    alertContainer: {
      position: 'absolute' as 'absolute',
      top: '2rem',
      left: '0',
      right: '0'
    },

    alertInner: {
      position: 'absolute' as 'absolute',
      top: '60px',
      display: 'inline-block',
      padding: '8px 16px',
      zIndex: '1',
      color: '#fff',
      minWidth: '300px',
      borderRadius: '5px',
      //backgroundColor: '#ffffff',
      //margin: '0 auto',
      right: '2rem',
      boxShadow: '1px 2px 10px - 3px rgb(0 0 0 / 70 %)',
      backgroundColor: '#45d49d'

    }
  }

  if (type === 'wrong') {
    styles.alertInner.backgroundColor = 'red'
  } else if (type === 'warning') {
    styles.alertInner.backgroundColor = 'yellow'
  } else if (type === 'info') {
    styles.alertInner.backgroundColor = 'blue'
  }


  return (
    <div>
      <input
        onClick={handleButtonClick}
        className="font-bold uppercase bg-main-500 text-white p-2 rounded-lg hover:bg-main-600 cursor-pointer focus:outline focus:outline-2 focus:outline-main-300 disabled:bg-gray-300 disabled:text-gray-200 disabled:outline-0"
        type="submit"
        value={value ? value : "Submit"}
        disabled={disabled || false}
      />
      {
        isAlertVisible && <div style={styles.alertContainer}>
          <div style={styles.alertInner}>{message}</div>
        </div>
      }

    </div>





  )
}