// SPA stands for Single-Page Application
function Spa() {
  // shared context is our set of users
  return (
    <HashRouter>
      <NavBar />
      <UserContext.Provider
        value={{
          users: [
            {
              name: "abel",
              email: "abel@mit.edu",
              password: "secret",
              balance: 100,
            },
            {
              name: "a",
              email: "s",
              password: "d",
              balance: 200,
            },
          ],
        }}
      >
        <CurrentUser.Provider value={{ currUser: "" }}>
          <Route path="/" exact component={Home} />
          <Route path="/CreateAccount" component={CreateAccount} />
          <Route path="/login" component={Login} />
          <Route path="/deposit" component={Deposit} />
          <Route path="/withdraw" component={Withdraw} />
          <Route path="/balance" component={Balance} />
          <Route path="/alldata" component={AllData} />
        </CurrentUser.Provider>
      </UserContext.Provider>
    </HashRouter>
  );
}
ReactDOM.render(<Spa />, document.getElementById("root"));
