import AccountsList from "../components/AccountsList";
import React, { useEffect, useState } from "react";
import * as accountService from "../services/AccountService";

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    accountService.fetchAccounts().then((response) => {
      setAccounts(response.data);
    });
  }, []);

  return <AccountsList accounts={accounts} />;
};

export default AccountsPage;
