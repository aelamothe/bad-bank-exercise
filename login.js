function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);
  const loggedInStatus = React.useContext(CurrentUser);
  const userEmails = ctx.users.map((a) => a.email);

  function validate(username, pass) {
    let result = false;
    let currUser = userEmails.indexOf(username);
    console.log(currUser);
    // check that fields have been populated
    if (!username || !pass) {
      console.log("missing info");
      setStatus("Error: Enter all info");
      setTimeout(() => setStatus(""), 5000);
      return false;
    } else result = true;

    // check that email exists
    if (userEmails.indexOf(username) < 0) {
      console.log("incorrect email");
      setStatus("Error: Incorrect email");
      setTimeout(() => setStatus(""), 5000);
      return false;
    } else {
      console.log("email success");
      result = true;
    }

    if (ctx.users[currUser].password !== pass) {
      console.log("incorrect password");
      setStatus("Error: Incorrect password");
      setTimeout(() => setStatus(""), 5000);
      return false;
    } else {
      console.log("password success");
      result = true;
    }
    // update currentUser context once validated
    loggedInStatus.currUser = email;
    console.log(loggedInStatus.currUser);
    return result;
  }

  function handleSubmit() {
    console.log(email, password);
    // return early if any of the validation checks fail
    if (!validate(email, password)) return;

    console.log(ctx.users);
    // hide our initial form
    setShow(false);
  }

  return (
    <Card
      bgcolor="primary"
      header="Login"
      status={status}
      body={
        show ? (
          <>
            Email
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            Password
            <br />
            <input
              type="input"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleSubmit}
            >
              Log In
            </button>
            <> </>
            <Link to="/CreateAccount" className="btn btn-light">
              Create Account
            </Link>
          </>
        ) : (
          <>
            <h5>Success!</h5>
            <Link to="/deposit" className="btn btn-light">
              Deposit
            </Link>
            <> </>
            <Link to="/withdraw" className="btn btn-light">
              Withdraw
            </Link>
            <br />
            <br />
            <Link to="/CreateAccount" className="btn btn-light">
              Logout
            </Link>
          </>
        )
      }
    />
  );
}
