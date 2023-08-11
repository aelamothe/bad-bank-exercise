function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [withdraw, setwithdraw] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const ctx = React.useContext(UserContext);
  const loggedInStatus = React.useContext(CurrentUser);
  let thisUser = ctx.users.find(findUser);

  function clearForm() {
    setwithdraw(0);
    setShow(true);
  }

  function findUser(u) {
    return u.email === loggedInStatus.currUser;
  }
  function loggedIn() {
    // if not logged in, return
    if (loggedInStatus.currUser === "") {
      setStatus("Error: please log in");
      setTimeout(() => setStatus(""), 5000);
      return false;
    }
    setTotalState(thisUser.balance);
    return true;
  }
  // validated withdraw
  function validated(amount) {
    // update the total based on the logged in user's account
    if (amount <= 0) {
      setStatus("Please enter a number greater than 0");
      return false;
    }
    if (amount > thisUser.balance) {
      setStatus("Please ensure sufficient funds for withdrawal");
      return false;
    }
    thisUser.balance = Number(thisUser.balance);
    amount = Number(amount);
    thisUser.balance -= amount;
    setTotalState(thisUser.balance);
    return true;
  }

  // update total balance
  function handleSubmit(event) {
    console.log(ctx.users);

    // return early if any of the validation checks fail
    if (!loggedIn()) return;
    if (!validated(withdraw)) return;
    event.preventDefault();
    // hide our initial form
    setShow(false);
  }

  // if show = false, provide option to submit another transaction
  return (
    <Card
      bgcolor="warning"
      header="Withdraw"
      status={status}
      body={
        loggedIn ? (
          show ? (
            <>
              Withdraw Amount
              <br />
              <input
                type="number"
                className="form-control"
                id="withdraw"
                placeholder="Withdraw Amount"
                value={withdraw}
                onChange={(e) => setwithdraw(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleSubmit}
              >
                Withdraw
              </button>
            </>
          ) : (
            <>
              <h5>Success!</h5>
              <p>Your new balance is ${totalState}</p>
              <p>Would you like to make another transaction?</p>
              <Link to="/deposit" className="btn btn-light">
                Deposit
              </Link>
              <> </>
              <button
                type="submit"
                className="btn btn-light"
                onClick={clearForm}
              >
                Withdraw
              </button>

              <br />
              <Link to="/CreateAccount" className="btn btn-light">
                Logout
              </Link>
            </>
          )
        ) : (
          <>
            <h5>Please log in!</h5>
            <br />
            <br />
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </>
        )
      }
    />
  );
}
