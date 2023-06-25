import classes from './QuoteForm.module.css';
import { useRef } from 'react';

export const QuoteForm = ({ onAdd }) => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    //reading entered values 1. use useState to capture entered values
    //reading entered values 2. use useRef

    //read access via current property
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    //prepare collected values for sending
    const collectedData = {
      name: enteredName,
      email: enteredEmail,
    };

    onAdd(collectedData);
  };

  return (
    <>
      quote form
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='name'>name</label>
          <input type='text' required id='name' ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='email'>email</label>
          <input type='email' required id='email' ref={emailInputRef} />
        </div>
        {/* put multicheckbox here... */}
        <div className={classes.actions}>
          <button>submit</button>
        </div>
      </form>
    </>
  );
};
